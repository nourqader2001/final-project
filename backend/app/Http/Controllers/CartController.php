<?php

// app/Http/Controllers/CartController.php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cart;
use App\Http\Resources\CartResource;

class CartController extends Controller
{
    public function index()
    {
        $cartItems = Cart::with('product')->get(); // Eager load the product relationship
        return CartResource::collection($cartItems);
    }

    public function show($id)
    {
        $cart = Cart::with('product')->findOrFail($id); // Eager load the product relationship
        return new CartResource($cart);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0.01',
            'product_id' => 'required|exists:products,id',
        ]);

        $cart = Cart::create($validatedData);
        return new CartResource($cart->load('product')); // Eager load the product relationship
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'quantity' => 'required|integer|min:1',
        ]);

        $cart = Cart::findOrFail($id);
        $cart->update($validatedData);

        return new CartResource($cart->load('product')); // Eager load the product relationship
    }

    public function destroy($id)
    {
        $cart = Cart::findOrFail($id);
        $cart->delete();

        return response()->json(null, 204); // Return no content status after deletion
    }
}

