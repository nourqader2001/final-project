<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class advice extends Model
{
    use HasFactory;
    protected $table = "advices";
    protected $fillable = ['title','body','image'];
}
