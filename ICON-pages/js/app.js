/*jslint browser: true, devel: true*/
/*global $, jQuery, alert, Firebase*/
$(function() {
    "use strict";
    //Creating the firebase reference.
    var firebaseref = new Firebase("https://icon-demo.firebaseIO.com"),
        //Global Variables for userData and the firebase reference to the list.
        userData = null;
    //Clear the Status block for showing the Status of Firebase Calls
    $(".status").removeClass('hide').hide();
    //This function is a callback for ref.onAuth() and is triggered every time the login status of the user changes.
    //This function is also called when the app is initialized (and hence helps you in maintaining the session for a user).
    var authDataCallback = function(authData) {
        console.log(
            "authCallback Event is called from onAuth Event");
        if (authData) {
            console.log("User " + authData.uid +
                " is logged in with " + authData.provider);
            userData = authData;
            $(".status").html('You are logged in!').show();
        } else {
            console.log("User is logged out");
            $(".status").html('You are not logged in!').show();
            userData = null;
        }
    };
    //Logout action handler
    $("#logout").on('click', function() {
        firebaseref.unauth();
        userData = null;
        $(".status").html('You are logged out!').show();
    });
    //Callback for authWithPassword API Call
    var loginCallback = function(error, authData) {
        if (error) {
            console.log("Login Failed!", error);
            $("#login-btn").parent().find('.status').html(
                "Login Failed!:" + error).show();
        } else {
            console.log("Authenticated successfully with payload:",
                authData);
            $("#login-btn").parent().find('.status').html(
                "You are logged in as:" + authData.uid + "<a class='btn waves-effect waves-light red lighten-1' id='logout'>Logout</a>").show();
            
        }
    };
    //Function to log in a user using email and password.
    var loginUser = function(email, password, callback) {
        firebaseref.authWithPassword({
            email: email,
            password: password
        }, callback);
    };
    //Handling Login Process
    $("#login-btn").on('click', function() {
        var email = $("#login-email").val();
        var password = $("#login-password").val();
        loginUser(email, password, loginCallback);
    });
    
});