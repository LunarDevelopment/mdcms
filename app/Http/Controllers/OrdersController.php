<?php namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Config;
use JWT;
use GuzzleHttp;
use GuzzleHttp\Subscriber\Oauth\Oauth1;
use App\User;
use App\Order;
use Mail;

class OrdersController extends Controller {

  /**
   * Generate JSON Web Token.
   */
    protected function createToken($user)
    {
      $payload = [
        'sub' => $user->id,
        'iat' => time(),
        'exp' => time() + (2 * 7 * 24 * 60 * 60)
      ];
      return JWT::encode($payload, Config::get('app.token_secret'));
    }

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
      //
      $orders = Order::all();
      return response()->json(['orders' => $orders]);
	}

	/**
	 * Show the form for creating a new resource.
	 *
	 * @return Response
	 */
    public function create(Request $request)
	{
      $user = User::find($request['user']['sub']);
      $status = "ERROR";
      $message = "Somethings not right..";
      //
      $order = new Order;

      $order->companyName = $request->input('companyName', '');
      $order->createdBy = $user->displayName;
      $order->rep = $request->input('rep', '');
      $order->contact = $request->input('contact', '');
      $order->telephone = $request->input('telephone', '');
      $order->email = $request->input('email', '');
      $order->designer = $request->input('designer', '');
      $order->status = $request->input('status', 'Pending');
      $order->comment = $request->input('comment', '');
      $order->value = $request->input('value');
      $order->profit = $request->input('profit');
      $order->soldDate = $request->input('soldDate');
      $order->firstDraftDate = $request->input('firstDraftDate');
      $order->redraftDate = $request->input('redraftDate');
      
      if ($order->save()) {
        $status = "OK";
        $message = "Created!";
      } else {
        $status = "ERROR";
        $message = "Error!";
      };
      return response()->json(array('token' => $this->createToken($user),
                                    'status' => $status,
                                    'message' => $message,
                                    'orders' =>  Order::all()));
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		//
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		//
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
    public function edit(Request $request)
	{
      // /statusChange
      $user = User::find($request['user']['sub']);
      $status = "ERROR";
      $message = "Somethings not right..";

      //
      $order = Order::find($request['id']);
      $order->status = $request->input('status');
      $order->credits = $request->input('credits', 0);
      $order->rep = $request->input('rep', '');
      $order->save();

      if ($order->save()) {
        $status = "OK";
        $message = "Updated!";
      } else {
        $status = "ERROR";
        $message = "Error!";
      };

      return response()->json(array('token' => $this->createToken($user),
                                    'status' => $status,
                                    'message' => $message,
                                    'orders' =>  Order::all()));
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
    public function update(Request $request)
	{
      $user = User::find($request['user']['sub']);
      $status = "ERROR";
      $message = "Somethings not right..";
      
		//
      $order = Order::find($request['id']);

      $order->companyName = $request->input('companyName');
      $order->createdBy = $user->displayName;
      $order->contact = $request->input('contact');
      $order->rep = $request->input('rep', '');
      $order->telephone = $request->input('telephone');
      $order->email = $request->input('email');
      $order->designer = $request->input('designer');
      $order->status = $request->input('status');
      $order->comment = $request->input('comment');
      $order->value = $request->input('value');
      $order->profit = $request->input('profit');
      $order->soldDate = $request->input('soldDate');
      $order->firstDraftDate = $request->input('firstDraftDate');
      $order->redraftDate = $request->input('redraftDate');
      
      $order->save();

      if ($order->save()) {
        $status = "OK";
        $message = "Updated!";
      } else {
        $status = "ERROR";
        $message = "Error!";
      };

      return response()->json(array('token' => $this->createToken($user),
                                    'status' => $status,
                                    'message' => $message,
                                    'orders' =>  Order::all()));
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
    public function destroy(Request $request)
	{
		//
      $user = User::find($request['user']['sub']);
      $status = "ERROR";
      $message = "Somethings not right..";
      $order = Order::find($request['id']);
      if ($order) {
        $order->delete();
        $status = "OK";
        $message = "Deleted!";
      } else {
        $status = "ERROR";
        $message = "Error!";
      };

      return response()->json(array('token' => $this->createToken($user),
                                    'status' => $status,
                                    'message' => $message,
                                    'orders' =>  Order::all()));
	}
  
    public function sendEmailReminder(Request $request)
    {
      $user = User::find($request['user']['sub']);
      
      Mail::send('emails.reminder', ['user' => $user], function ($m) use ($user) {
        $m->to($user->email, $user->name);
        $m->subject('Your Reminder!');
        $m->from($user->email, $user->name);
        $m->sender($user->email, $user->name);
        $m->bcc($user->email, $user->name);
        $m->replyTo($user->email, $user->name);
      });
    }
}