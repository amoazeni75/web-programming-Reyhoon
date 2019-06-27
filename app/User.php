<?php


    /**
     * S.Alireza Moazeni
     *
     * 9423110
     */

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use Notifiable;
    
    //this is better to keep following value as string instead int, for security purpose
    const VERIFIED_USER = '1';
    const UNVERIFIED_USER = '0';

    const ADMIN_USER = 'true';
    const REGULAR_USER = 'false';
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
     * The attributes that should be hidden for arrays. all atributes that we don not want 
     * to send in json response
     * @var array
     */
    protected $hidden = [
        'password', 
        'remember_token',
        'verification_token', 
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function isAdmin(){
        return $this->admin == User::ADMIN_USER;
    }

    public function isVerified(){
        return $this->verified == User::VERIFIED_USER;
    }

    public function generateVerificationCode(){
        return str_random(60); //return a string with length 60 including random letters and numbers
    }
}
