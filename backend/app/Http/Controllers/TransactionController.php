<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use \App\Models\Transaction;
use Illuminate\Support\Facades\Validator;

class TransactionController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $userId = auth()->user()->_id;
        $limit = $request->query('limit', 10);
        $cursor = $request->query('cursor');
        $query = Transaction::orderBy('_id', 'DESC');
        if ($cursor) $query->where('_id', '<', $cursor);
        $transactions = $query->limit($limit)->get();
        return response()->json($transactions);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $user = auth()->user();
        $payload = request(['factor', 'description', 'amount']);

        // create validate schema
        $validator = Validator::make(
            array_merge($payload, ["balance" => $user->balance]), 
            [
                'factor' => 'required|numeric|in:-1,1',
                'description' => 'required|string|min:6',
                'document' => 'required_if:factor,1',
                'amount' => [
                    'required',
                    'numeric',
                    'min:0.01',
                    $payload['factor'] == -1 ? 'lte:balance' : '',
                ]
            ],
            [
                'amount.lte' => 'You do not have enough funds in your account to make this transfer.',
                'document.required_if' => 'The document is required to create a deposit.',
            ]
        );

        // validate provided data
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // create a new transation on database is everything is ok
        $transaction = Transaction::create([
            'factor' => $payload['factor'],
            'amount' => $payload["amount"],
            'description' => $payload["description"],
            'user_id' => $user->_id,
            'document' => null,
            'status' => "pending",
        ]);

        // return created transaction
        return response()->json($transaction->fresh());
    }

    /**
     * Generate signed url to upload document.
     */
    public function upload(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $userId = auth()->user()->_id;
        $transaction = Transaction::where('_id', '=', $id)
        ->where('user_id', '=', $userId)
        ->first();
        return response()->json($transaction);
    }
}
