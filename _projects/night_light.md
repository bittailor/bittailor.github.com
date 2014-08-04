---
layout: default
title: LED Matrix Night Light
description: A DIY children's night light with 16*16 RGB LEDs.
image: night-light-small.png
tags: [ Arduino, LED-Matrix ]
order: 40
---

A DIY children's night light with 16\*16 RGB LEDs.
Uses an [Arduino UNO](http://arduino.cc/en/Main/arduinoBoardUno) as a master to display the images on the **4** 8\*8 RGB LED matrixes which are driven by **4** [Colorduinos](http://imall.iteadstudio.com/development-platform/arduino/arduino-compatible-mainboard/im120410004.html).

![](/res/NightLightOverview.png)


<div class="row">
<div id="carousel-example-generic" class="carousel slide col-md-6 col-md-offset-2" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
    <li data-target="#carousel-example-generic" data-slide-to="1"></li>
    <li data-target="#carousel-example-generic" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="item active">
      <img src="/res/night-light-raw2.png" alt="1">
      <div class="carousel-caption">
         The LED matrixes on top of the Colorduinos
      </div>
    </div>
    <div class="item">
        <img src="/res/night-light-raw1.png" alt="1">
        <div class="carousel-caption">
         The Arduino controlling the Colorduinos
        </div>
    </div>
    <div class="item">
        <img src="/res/night-light-raw3.png" alt="1">
        <div class="carousel-caption">
          The DIY touch sensors to change the images
        </div>
     </div>
  </div>

  <!-- Controls -->
  <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
    <span class="glyphicon glyphicon-chevron-left"></span>
  </a>
  <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
    <span class="glyphicon glyphicon-chevron-right"></span>
  </a>
</div>
</div>

<p>
<br/>
</p>

#### Source Code

<span class="octicon octicon-repo"></span> [Source code repository](https://github.com/bittailor/BtArduino/tree/master/NightLight)  at <span class="octicon octicon-mark-github"></span>
