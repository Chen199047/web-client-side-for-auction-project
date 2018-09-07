<template>
  <div class="row intro-header">
    <div class="container-fluid row">
      <br>

      <h3 class="col"> Auction details </h3>
      <br>
      <div v-if="errorFlag" style="color: red;">
        {{error}}}
      </div>
      <div v-if="this.$route.params.auctionId">
        <div id="auction-detail">

          <router-link :to="{ name: 'Home'}"
          >Back to Auctions</router-link>
          <br /><br />


          <section class="auction-details row">
            <div class="col-sm-1 col-md-2">
            </div>
            <div class="col-sm-10 col-md-8">
              <div class="img-thumbnail"  >
                <img v-bind:src= "imageUri" alt="Lights" style="width: 90%;height: 90%">
                <div class="figure-caption">
                  <p>Title {{title}}</p>
                  <p>Start Date {{formatDate(start_date)}}</p>
                  <p>End Date {{formatDate(end_date)}}</p>
                  <p>Description: {{description}}</p>

                </div>


              </div>


            </div>



            <div id="bid_details" class="bid_details col-sm col-md">
              <div id="bids" class="row" align="center">
                <div class="col">
                  <pre >Last Bid:  {{amount}} </pre>
                </div>
                <div class="col">
                  <pre >Bid date:  {{bid_datetime.date}} </pre>
                </div>
                <div class="col">
                  <pre >Bid time:  {{bid_datetime.time}} </pre>
                </div>
                <div class="col">
                  <pre >Buyer:  {{buyerUsername}} </pre>
                </div>
                <div class="col">
                  <button type="button" class="btn bg-success col" data-toggle="modal"  data-target="#makeBidModal">Make Bid</button>
                </div>
              </div>
            </div>
            <br/>
            <br/>

          </section>




        </div>

      </div>


    </div>
    <div class="modal fade" id="makeBidModal" tabindex="-1" role="dialog"
         aria-labelledby="deleteUserModalLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="deleteUserModalLabel">Make bid</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Submit">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            You will bid the auction.
          </div>
          <div class="form-group">
            <label >Bid Amount</label>
            <input v-model="amount" type="text" name="bid_amount" id="bid_amount" class="form-control input-sm" placeholder="Amount">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal" v-on:click="makeBid()">
              Confirm
            </button>
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
        imageUri:"",
        auction_id:"",
        category:"",
        title:"",
        seller:[],
        start_date:0,
        end_date:0,
        description:"",
        start_bid:0,
        current_bid:0,

        authToken:"",
        bid_datetime:"",
        amount:"",
        buyerUsername:""

      }
    },


    mounted: function () {

      if(this.$route.params.auctionId)
        this.getSingleAuction(this.$route.params.auctionId);



      },

    methods: {


      getSingleAuction: function (auctionId) {
        console.log(auctionId);
        this.auction_id = auctionId;
        //console.log('cokkietoken:'+this.$cookies.get("user_session"));
        this.$http.get('http://localhost:4941/api/v1/auctions/' + auctionId
        ).then(function (response) {



          this.auction_id = auctionId;
          //console.log(response.data);
          this.category = response.data.categoryTitle;
          this.title = response.data.title;
          this.description = response.data.description;
          this.end_date = response.data.endDateTime;
          this.start_date = response.data.startDateTime;
          this.start_bid = response.data.startingBid;
          this.current_bid = response.data.currentBid;
          //this.bid_history = response.data.bids;
          this.buyerUsername = response.data.bids[0].buyerUsername;
          this.amount = response.data.bids[0].amount;

          let datetime = this.formatDate2(response.data.bids[0].datetime);
          console.log(datetime);
          this.bid_datetime = datetime;
          this.seller = response.data.seller.username;
          this.imageUri = 'http://localhost:4941/api/v1/auctions/' + this.auction_id + "/photos";
          console.log(this.imageUri);
          //return response.data;
          //this.$router.push('/');
        });
      },
      formatDate:function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return y + '-' + MM + '-' + d + ' ' +h + ':' + m + ':' + s;
      },
      formatDate2:function (value) {
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? ('0' + MM) : MM;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let m = date.getMinutes();
        m = m < 10 ? ('0' + m) : m;
        let s = date.getSeconds();
        s = s < 10 ? ('0' + s) : s;
        return {  date:y + '-' + MM + '-' + d + ' ' ,
          time: h + ':' + m + ':' + s};
      },
      makeBid:function () {
        if(this.amount&&this.$cookie.get("user_id")){
          console.log(this.amount);
          //console.log(authToken);
          console.log(this.$cookie.get("user_session"));
          console.log(this.$cookie.get("user_id"));
          this.$http.post('http://localhost:4941/api/v1/auctions/' + this.auction_id+"/bids?amount="+parseInt(this.amount),{},{
            //emulateJSON: true,
            headers: {

              'X-Authorization': this.$cookie.get("user_session")

            }}

          ).then(function (response) {
            console.log(response.data);

          })
        }else{
          alert("Please fill up the requirement or you should login");
        }

      }

    }
  }


</script>

<style>

  .bid_details {

    padding:5%;
    margin:2%;
    background-color: #bbbbbb;
    width: 100%;
    height: 100%;
  }




</style>
