<template>
  <div id="register">
    <div class="row">

      <div class="panel panel-default col-md-6 mx-auto">
        <br/>
        <h3 class="panel-title">Sign up for Auction</h3>
        <div class="panel-body">

          <form role="form">

            <div class="form-group">
              <label for="userName">User Name*	</label>
              <input v-model="userName" type="text" name="userName" id="userName" class="form-control input-sm" placeholder="User Name">
            </div>

            <div class="form-group">
              <label for="givenName">Given Name*	</label>
              <input v-model="givenName" type="text" name="givenName" id="givenName" class="form-control input-sm" placeholder="Given Name">
            </div>

            <div class="form-group">
              <label for="familyName">Family Name*	</label>
              <input v-model="familyName" type="text" name="familyName" id="familyName" class="form-control input-sm" placeholder="Family Name">
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
              <button v-on:click="registerUser()" type="button" class="btn btn-info right">Sign up</button>

            </div>

          </form>
        </div>
      </div>
    </div>


  </div>

</template>

<script>
  export default {
    name: 'register',
    data () {
      return {
        error: "",
        errorFlag: false,
        givenName:"",
        familyName:"",
        userName: "",
        password: "",
        email: "",
        userID:"",

      }
    },

    created:function () {
      this.checkLogin();

    },
    methods:{
      registerUser:function () {
        if(this.userName &&this.givenName&&this.familyName&& this.password && this.email){
          this.$http.post('http://localhost:4941/api/v1/users',
            {
              "username": this.userName,
              "givenName": this.givenName,
              "familyName": this.familyName,
              "password": this.password,
              "email":this.email
            }
          ).then(function (response) {
            this.userID = response.data.id;
            this.$router.push('/login');
          },function (error) {

            this.error = error;
            this.errorFlag = true;
          })
        }else{
          alert("Please fill up all the requirements");
        }
      },
      checkLogin:function () {

        if(this.$cookie.get('user_id')){
          //console.log(this.$cookies.get('user_id'));
          alert("You already logged in")
          this.$router.push('/');
        }

      }
    }

  }
</script>
