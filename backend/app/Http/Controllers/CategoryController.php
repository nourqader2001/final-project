<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Resources\CategoryResource;
use Illuminate\Support\Facades\Storage;

class CategoryController extends Controller
{
    // Other methods like index(), show() are already defined as per your code

    public function store(Request $request)
    {
        // Validate request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Handle file upload
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
        }

        // Create a new category
        $category = Category::create([
            'name' => $validatedData['name'],
            'image' => $imagePath,
        ]);

        // Return a response indicating success
        return response()->json(['message' => 'Category created successfully', 'category' => $category], 201);
    }

    public function update(Request $request, $id)
    {
        try {
            $category = Category::findOrFail($id);

            // Validate request data
            $validatedData = $request->validate([
                'name' => 'required|string|min:3|max:255',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            // Update category name
            $category->name = $validatedData['name'];

            // Handle image upload if provided
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('categories', 'public');
                $category->image = $imagePath;
            }

            // Save the updated category
            $category->save();

            return response()->json(['message' => 'Category updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
    


    public function destroy($id)
    {
        if (Category::where('id', $id)->exists()) {
            $category = Category::find($id);
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }
            $category->delete();

            return response()->json([
                "message" => "Record deleted successfully"
            ], 202);
        } else {
            return response()->json([
                "message" => "Category not found"
            ], 404);
        }
    }
}
