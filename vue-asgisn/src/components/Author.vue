<template>
  <div class="Author">
    <div class="A_image">
      <img src="../assets/logo.png">
    </div>
    <p class="A_name">zangval</p>
    <div class="link_btn">
      <p class="link_img">
        <img src="../assets/logo.png">
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Author',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.Author {
  width: 260px;
  height: 300px;
  background: beige;
  padding-top: 30px;
  box-sizing: border-box;
  .A_image {
    height: 100px;
    width: 100px;
    border-radius: 50px;
    margin-top: 30px;
    margin: 0px auto;
    background: #fff;
    overflow: hidden;
    img {
      height: 100px;
      width: 100px;
    }
  }
  .A_name {
    font-size: 18px;
    text-align: center;
    font-weight: 500;
    color: #777;
  }
  .link_btn {
    margin: 50px 0 0;
    text-align: center;
    .link_img {
      width: 30px;
      height: 30px;
      background: #fff;
      display: inline-block;
      border: none;
      border-radius: 15px;
      overflow: hidden;
      img {
        width: 30px;
        height: 30px;
      }
    }
  }
}
</style>
