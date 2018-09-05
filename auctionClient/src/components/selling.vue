<template>

  <div class="container">

    <br>
    <div id="list_an_item">

      <form>
        <h2>List your item</h2>
        <div class="form-group">
          <label>1. Choose a Category</label>

          <select v-model="category" name="category" class="form-control" id="category_select">
            <option value="Apparel">Apparel</option>
            <option value="Equipment">Equipment</option>
            <option value="Vehicles">Vehicles</option>
            <option value="Property">Property</option>
            <option value="Others">Others</option>
          </select>
          <br>
          <p>2. Listing details</p>

          <table class="table" cellpadding="7" cellspacing="0">
            <tbody>
            <tr>
              <td bgcolor="#F8F8F8" width="160">
                Listing Title:
              </td>
              <td bgcolor="#F8F8F8" >
                <input v-model="title" type="text" name="title" id="title">
              </td>
            </tr>
            <tr>
              <td bgcolor="#F8F8F8">
                Listing startDate:
              </td>
              <td bgcolor="#F8F8F8" >
                <input v-model="startDate" type="datetime-local" name="startDate" id="startDate">
              </td>
            </tr>
            <tr>
              <td bgcolor="#F8F8F8">
                Listing endDate:
              </td>
              <td bgcolor="#F8F8F8" >
                <input v-model="endDate" type="datetime-local" name="endDate" id="endDate">
              </td>
            </tr>
            <tr>
              <td bgcolor="#F8F8F8">
                Listing reservePrice:
              </td>
              <td bgcolor="#F8F8F8" >
                <input v-model="reservePrice" type="number" name="reservePrice" id="reservePrice" step="0.1">
              </td>
            </tr>
            <tr>
              <td bgcolor="#F8F8F8">
                Listing startingBid:
              </td>
              <td bgcolor="#F8F8F8" >
                <input v-model="startingBid" type="number" name="startingBide" id="startingBid" step="0.1">
              </td>
            </tr>
            <tr>
              <td bgcolor="#F8F8F8" width="160">
                Listing Description
              </td>
              <td bgcolor="#F8F8F8" >
                <textarea v-model="description" type="text" name="description" id="description" cols="55" rows="15">
                </textarea>
              </td>
            </tr>
            <tr>
              <td colspan="3" width="160" style="padding-left: 80%">
                <input class="btn-success" type="button" v-on:click="postAuction()" value="Submit">
              </td>
            </tr>
            </tbody>


          </table>

        </div>

      </form>
    </div>


  </div>


</template>

<script>
  export default {
    data() {
      return {
        error: "",
        errorFlag: false,
        token:"",

        auction_id:"",
        category:"",
        category_id:"",
        title:"",

        startDate:"",
        endDate:"",
        description:"",
        startingBid:0,
        reservePrice:0,
        user_id:"",
      }
    },


    mounted: function () {

      if(!this.$cookie.get("user_id")){

        this.$router.push('/users/login');}

    },

    methods: {


      postAuction: function () {

        this.user_id = this.$cookie.get("user_id");
        console.log(this.user_id);
        this.token=this.$cookie.get("user_session");
        console.log(this.token);
        switch (this.category){
          case "Apparel":
            this.category_id = 1;
            break;
          case "Equipment":
            this.category_id = 2;
            break;
          case "Vehicles":
            this.category_id = 3;
            break;
          case "Property":
            this.category_id = 4;
            break;
          case "Others":
            this.category_id = 5;
            break;

        };

        let requestBody = {
          "categoryId": this.category_id,
          "title": this.title,
          "description": this.description,
          "startDateTime": Date.parse(this.startDate),
          "endDateTime": Date.parse(this.endDate),
          "reservePrice": this.reservePrice,
          "startingBid": this.startingBid
        };
        if(this.category&&this.description&&this.startDate&&this.endDate&&this.startingBid&&this.reservePrice){
          this.$http.post('http://localhost:4941/api/v1/auctions', JSON.stringify(requestBody), {headers: {'X-Authorization': this.token}})
          .then(function (response) {
            this.auctionId = response.data.id;

            this.$router.push('/auctions');
          }, function (error) {
            this.error = error;
            this.errorFlag = true;
          })}else{
          alert("Please fill up all requirements")
        }



      }

    }
  }


</script>
