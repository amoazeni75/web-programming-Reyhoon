<?php
namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
class User extends Authenticatable
{
    use Notifiable, SoftDeletes;
    const VERIFIED_USER = '1';
    const UNVERIFIED_USER = '0';
    const ADMIN_USER = 'true';
    const REGULAR_USER = 'false';
    
    protected $table = 'users';
    protected $dates = ['deleted_at'];
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'verified',
        'verification_token',
        'admin',
    ];
    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
        'verification_token',
    ];

    //every time with want to set value for name and email two following func will be call
    //and every time we want to get value of name second func will be call 

    //defining mutator for name attribute it's struc is  : set + name of attr + Attribute
    public function setNameAttribute($name)
    {
        $this->attributes['name'] = strtolower($name);
    }
    //defing accessor : get + name of attr + Attribute
    public function getNameAttribute($name)
    {
        return ucwords($name);
    }

    public function setEmailAttribute($email)
    {
        $this->attributes['email'] = strtolower($email);
    }
    public function isVerified()
    {
        return $this->verified == User::VERIFIED_USER;
    }
    public function isAdmin()
    {
        return $this->admin == User::ADMIN_USER;
    }
    public static function generateVerificationCode()
    {
        return str_random(40);
    }
}