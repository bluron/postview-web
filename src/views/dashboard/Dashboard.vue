<template>
  <el-carousel :interval="5000" type="card" height="500px">
    <el-carousel-item class="el-carousel__item-1">
    </el-carousel-item>
    <el-carousel-item class="el-carousel__item-2">
    </el-carousel-item>
    <el-carousel-item class="el-carousel__item-3">
    </el-carousel-item>
  </el-carousel>
</template>

<style>
  .el-carousel__item-1 {
    background-color: #b95e5e;
    border-radius: 10px;
  }
  .el-carousel__item-2 {
    background-color: #52c578;
    border-radius: 10px;
  }
  .el-carousel__item-3 {
    background-color: #41a7b9;
    border-radius: 10px;
  }
</style>
