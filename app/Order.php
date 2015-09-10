<?php namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Order extends Model {

  use SoftDeletes;
  /**
   * The table associated with the model.
   *
   * @var string
   */
  protected $table = 'orders';
  
  /**
	 * Adding the columns to your model's $dates property will instruct Eloquent to return the columns as Carbon / DateTime instances instead of raw strings.
	 *
	 * @var array
	 */
  protected $dates = ['created_at', 'updated_at', 'deleted_at'];
  
  /**
   * Show a list of all available flights.
   *
   * @return Response
   */
  public function index()
  {
    $orders = Order::all();
    return response()->json(['orders' => $orders]);
  }
}
