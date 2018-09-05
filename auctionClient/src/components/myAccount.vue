<template>
  <div id="page-body">
    <br>
    <div id="mydetails" class="row">
      <table cellspacing="0" cellpadding="5" border="0" class="col">
        <tbody>
        <tr>
          <td>
            Name:
          </td>
          <td>
            {{username}}
          </td>
        </tr>
        <tr>
          <td>
            Email:
          </td>
          <td>
            {{user_email}}
          </td>
        </tr>

        </tbody>

      </table>



    </div>
    <div id="selling">
      <hr class="btn-dark">
      <h2>Items I'm selling</h2>
      <br>
      <div  class="table">


          <div class="row" v-for="sell in seller">
            <div>
              <hr>
            </div>
          <div class="col-4">
            <p>{{sell.id}}</p>
          </div>
          <div class="col-4">
            <p>
              {{sell.title}}
            </p>
          </div>
          <div class="col-4">
            <div>
              <router-link :to="{ name: 'auction', params: {auctionId: sell.id }}"
                           v-on:click="this.getSingleAuction($route.params.auctionId)">View the detail</router-link>
            </div>
          </div>
            <div class="col"> <hr class="btn-dark"></div>
          </div>
        <div id="winner">
          <h2>Items I won</h2>
          <div class="table">
            <div class="row" v-for="won in winner">
              <div>
                <hr>
              </div>
              <div class="col-4">
                <p>{{won.id}}</p>
              </div>
              <div class="col-4">
                <p>
                  {{won.title}}
                </p>
              </div>
              <div class="col-4">
                <div>
                  <router-link :to="{ name: 'auction', params: {auctionId: won.id }}"
                               v-on:click="this.getSingleAuction($route.params.auctionId)">View the detail</router-link>
                </div>
              </div>
              <div class="col"> <hr class="btn-dark"></div>
            </div>
          </div>


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
        user_id:"",
        username:"",
        user_email:"",
        seller:[],
        token:"",
        winner:[],


      }
    },
    mounted: function () {
      this.getUserDetail();
      this.getSelling();
      this.getWon();
    },
    methods: {

      getUserDetail: function () {

        this.user_id = this.$cookie.get("user_id");
        this.token =this.$cookie.get("user_session");
        console.log(this.user_id);
        this.$http.get('http://localhost:4941/api/v1/users/'+this.user_id,{headers: {'X-Authorization': this.token}}).then(function (response) {
          console.log(response.data);

          this.username = response.data[0].user_username;
          this.user_email=response.data[0].user_email;
          console.log(this.username);

        },function (error) {

          this.error = error;
          this.errorFlag = true;
        })

        //this.$route.push('/auctions');

      },
      getSelling:function () {
        this.$http.get('http://localhost:4941/api/v1/auctions?seller='+this.user_id).then(function (response) {
          console.log(response.data);
          this.seller=response.data;
          //his.auctionId = response.data.id
          //console.log(auctionId);



        },function (error) {

          this.error = error;
          this.errorFlag = true;
        })

      },
      getWon:function () {
        this.$http.get('http://localhost:4941/api/v1/auctions?winner='+this.user_id).then(function (response) {
          console.log(response.data);
          this.winner=response.data;
          //his.auctionId = response.data.id
          //console.log(auctionId);



        },function (error) {

          this.error = error;
          this.errorFlag = true;
        })

      }

    }
  }
</script>
