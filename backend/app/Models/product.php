<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    use HasFactory;
    protected $table = "products";
    protected $fillable = ['name','image','description','price','category_id','calories'];

    public function categories(){
        return $this->belongs(category::class);
    }

    public function cartItems(){
        return $this->hasMany(cart::class, 'product_id');
    }

    // public function cart_products2(){
    //     return $this->hasOne(product::class, 'product_id');
    // }

    
}
