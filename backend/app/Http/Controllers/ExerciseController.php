<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Exercise;
use App\Http\Resources\ExerciseResource;

class ExerciseController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $exercises = Exercise::all();
        return ExerciseResource::collection($exercises); // Return exercises as resource collection
    }
    
    // Method to store a new exercise
    public function store(Request $request)
    {
        try {
            // Validate request data
            $validatedData = $request->validate([
                'title' => 'required|string|max:255',
                'body' => 'required|string',
                'video' => [
                    'nullable',
                    'url',
                    'regex:/^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+$/'
                ],
            ], [
                'video.regex' => 'The video must be a valid YouTube URL.'
            ]);

            // Extract video ID from YouTube URL if present
            $videoId = null;
            if (isset($validatedData['video'])) {
                $videoId = $this->extractYouTubeVideoId($validatedData['video']);
            }

            // Create a new exercise
            $exercise = Exercise::create([
                'title' => $validatedData['title'],
                'body' => $validatedData['body'],
                'video' => $videoId, // Store only the video ID in the database
            ]);

            // Return a response indicating success
            return response()->json(['message' => 'Exercise created successfully', 'exercise' => new ExerciseResource($exercise)], 201);
        } catch (\Exception $e) {
            // Handle any exceptions and return an error response
            return response()->json(['message' => 'Failed to store exercise: ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $exercise = Exercise::findOrFail($id);
        return new ExerciseResource($exercise);
    }

    // Method to update an existing exercise
    public function update(Request $request, $id)
    {
        $exercise = Exercise::find($id);
        if ($exercise) {
            try {
                // Validate request data
                $validatedData = $request->validate([
                    'title' => 'sometimes|required|string|max:255',
                    'body' => 'sometimes|required|string',
                    'video' => [
                        'nullable',
                        'url',
                        'regex:/^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+$/'
                    ],
                ], [
                    'video.regex' => 'The video must be a valid YouTube URL.'
                ]);

                // Extract video ID from YouTube URL if present
                $videoId = null;
                if ($request->has('video')) {
                    $videoId = $this->extractYouTubeVideoId($validatedData['video']);
                }

                // Update exercise details
                if ($request->has('title')) {
                    $exercise->title = $validatedData['title'];
                }
                if ($request->has('body')) {
                    $exercise->body = $validatedData['body'];
                }
                if ($request->has('video')) {
                    $exercise->video = $videoId; // Store only the video ID in the database
                }

                $exercise->save();
                return response()->json(['message' => 'Exercise updated successfully', 'exercise' => new ExerciseResource($exercise)], 200);
            } catch (\Exception $e) {
                // Handle any exceptions and return an error response
                return response()->json(['message' => 'Failed to update exercise: ' . $e->getMessage()], 500);
            }
        } else {
            return response()->json(['message' => 'Exercise not found'], 404);
        }
    }

    public function destroy(Exercise $exercise)
    {
        $exercise->delete();
        return response()->json(null, 204);
    }

    // Helper function to extract YouTube video ID
    private function extractYouTubeVideoId($url)
    {
        // Extract video ID from YouTube URL
        if (preg_match('/^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/', $url, $matches)) {
            return $matches[4]; // Return the video ID part
        }
        return null; // Return null if no valid ID found
    }
}
