<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Http\Resources\UserResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash; // Import Hash facade

class UserController extends Controller
{
    // Display a listing of the users.
    public function index()
    {
        $users = User::all();
        return UserResource::collection($users);
    }

    // Store a newly created user in storage.
    public function store(Request $request)
    {
        // Validate the request
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Create the user
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'password' => Hash::make($validatedData['password']), // Use Hash facade
        ]);

        return response()->json($user, 201);
    }

    // Display the specified user.
    public function show($id)
    {
        $user = User::findOrFail($id);
        return new UserResource($user);
    }

    // Update the specified user in storage.
    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'height' => 'required|numeric',
            'age' => 'required|integer',
            'gender' => 'required|string',
            'weight_goal' => 'required|numeric',
        ]);

        $user = User::findOrFail($id);
        $user->update($validatedData);

        return new UserResource($user);
    }

    // Remove the specified user from storage.
    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();
        return response()->json(null, 204);
    }
}
