<template>
  <div class="container">
    <div class="row">
      <div class="panel panel-default col-md-6 mx-auto">
        <div class="panel-heading">
          <h3 class="panel-title">Login for Auction</h3>
        </div>
        <div class="panel-body">
          <form role="form">

            <div class="form-group">
              <label for="name">Name*	</label>
              <input v-model="username" type="text" name="name" id="name" class="form-control input-sm" placeholder="User Name">
            </div>

            <div class="form-group">
              <label for="email">Email*	</label>
              <input v-model="email" type="email" name="email" id="email" class="form-control input-sm" placeholder="Email Address">
            </div>

            <div class="form-group">
              <label for="password">Password*	</label>
              <input v-model="password" type="password" name="password" id="password" class="form-control input-sm" placeholder="Password">
            </div>


            <div class="form-group">
              <button v-on:click="loginUser()" type="button" class="btn btn-info right">Log in</button>

            </div>

          </form>
        </div>
      </div>
    </div>
  </div>

</template>


<script>
  export default {
    data() {
      return {
        error: "",
        errorFlag: false,
        userId: "",
        username: "",
        password: "",
        email: "",

        user: {},
        authToken: ""
      }
    },
    created: function () {
      if(this.$cookie.get("user_id")){
        //console.log(this.$cookies.get('user_id'));
        alert("You already log in");
        this.$router.push('/');

      }


    },
    methods: {

      loginUser: function () {
        if (this.username === "" && this.email ==='') {
          alert("Please enter an username or email!");
        }  else if (this.password === "") {
          alert("Please enter an password !");
        }else if(this.authToken){
          alert("You already login.");
          console.log('token:'+this.authToken);
        }
        else {
          console.log("username: " + this.username+ "email: " + this.email +"password: " + this.password);
          //this.$http.post('http://localhost:4941/api/v1/users/login?username='+this.username+'&email='+this.email+'&password='+
            //this.password)
          var $ = require('jquery');
          var params = {username:this.username,password:this.password,email:this.email}
          var queryString = $.param(params);
          this.$http.post('http://localhost:4941/api/v1/users/login?'+queryString)
            .then(function (response) {
              //this.authToken = response.data.token;
              //console.log(response.data.token);
              this.userId = response.data.id;
              this.authToken = response.data.token;
              this.$cookie.set("user_id", this.userId,{expires:'1h'});
              this.$cookie.set("user_session", response.data.token,{expires:'1h'});
              //console.log('cokkietoken:'+this.$cookies.get("user_session"));
              //this.$cookies.set("username", this.username,60*60);
              //console.log(this.$cookies.get("username"));
              //this.$router.push('/auctions');
              this.$router.push('/');
            }, function (error) {

              this.error = error;
              this.errorFlag = true;
            });

        }
      },

    }
  }
</script>
