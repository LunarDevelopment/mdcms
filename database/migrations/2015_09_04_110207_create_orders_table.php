<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateOrdersTable extends Migration {

	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
      Schema::create('orders', function(Blueprint $table)
      {
        $table->increments('id')->unique();
        $table->string('createdBy')->nullable();
        $table->string('rep')->nullable();
        $table->string('credits')->nullable();
        $table->string('companyName')->nullable();
        $table->string('contact')->nullable();
        $table->string('telephone')->nullable();
        $table->string('email')->nullable();
        $table->string('designer')->nullable();
        $table->string('status')->nullable();
        $table->string('comment')->nullable();
        $table->float('value')->nullable();
        $table->float('profit')->nullable();
        $table->date('soldDate')->nullable();
        $table->date('firstDraftDate')->nullable();
        $table->date('redraftDate')->nullable();
        $table->softDeletes();
        $table->timestamps();
      });
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::drop('orders');
	}

}
