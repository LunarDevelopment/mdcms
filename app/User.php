<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Cashier\Billable;
use Laravel\Cashier\Contracts\Billable as BillableContract;

class User extends Model implements BillableContract {
    /**
	 * Add the Billable trait and appropriate date mutators to your model definition:
	 *
	 * use Billable;
	 */
    use Billable;

    use SoftDeletes;
	/**
	 * The database table used by the model.
	 *
	 * @var string
	 */
	protected $table = 'users';

	/**
	 * The attributes excluded from the model's JSON form.
	 *
	 * @var array
	 */
	protected $hidden = ['password'];

	/**
	 * Adding the columns to your model's $dates property will instruct Eloquent to return the columns as Carbon / DateTime instances instead of raw strings.
	 *
	 * @var array
	 */
    protected $dates = ['trial_ends_at', 'subscription_ends_at', 'deleted_at'];

}
