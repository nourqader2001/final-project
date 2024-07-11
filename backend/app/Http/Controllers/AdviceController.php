<?php

namespace App\Http\Controllers;

use App\Models\Advice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AdviceController extends Controller
{
    public function index()
    {
        $advices = Advice::all();
        return response()->json($advices);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'title' => 'required|string|max:255',
            'body' => 'required|string',
            'image' => 'required|file|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        // Handle file upload
        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('images', 'public');
        }

        // Create a new advice
        $advice = Advice::create([
            'title' => $validatedData['title'],
            'body' => $validatedData['body'],
            'image' => $imagePath,
        ]);

        return response()->json($advice, 201);
    }

    public function show($id)
    {
        $advice = Advice::findOrFail($id);
        return response()->json($advice);
    }

    public function update(Request $request, $id)
    {
        try {
            $advice = Advice::findOrFail($id);

            // Validate request data
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'body' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            ]);

            // Update advice fields
            $advice->title = $validatedData['title'];
            $advice->body = $validatedData['body'];

            // Handle image upload if provided
            if ($request->hasFile('image')) {
                $imagePath = $request->file('image')->store('images', 'public');
                $advice->image = $imagePath;
            }

            // Save the updated advice
            $advice->save();

            return response()->json(['message' => 'Advice updated successfully'], 200);
        } catch (\Exception $e) {
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }


    public function destroy($id)
    {
        $advice = Advice::findOrFail($id);

        // Delete image if it exists
        if ($advice->image) {
            Storage::disk('public')->delete($advice->image);
        }

        $advice->delete();

        return response()->json(null, 204);
    }
}

