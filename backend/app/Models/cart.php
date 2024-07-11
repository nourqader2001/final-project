<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class cart extends Model
{
    use HasFactory;
    protected $table = "cart";
    protected $fillable = ['quantity','price','product_id'];

    public function product(){
        return $this->belongsTo(product::class);
    }
}
