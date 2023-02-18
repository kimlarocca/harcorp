<template>
  <div class="home">
    <Html lang="en">
      <Head>
        <Title>Harcorp LLC | Overview</Title>
      </Head>
    </Html>
    <section class="hero mb-7">
      <div class="container">
        <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed do</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do ipsum
          dolor sit amet, consectetur
        </p>
        <a href="#" class="p-button">Call To Action Goes Here</a>
      </div>
      <div class="bubbles">
        <div class="bubble x1"></div>
        <div class="bubble x2"></div>
        <div class="bubble x3"></div>
        <div class="bubble x4"></div>
        <div class="bubble x5"></div>
        <div class="bubble x6"></div>
        <div class="bubble x7"></div>
        <div class="bubble x8"></div>
      </div>
    </section>
    <section class="container mb-7">
      <div class="grid">
        <div class="col-12 lg:col box1 p-5">
          <h2 class="mb-4">Subheading 1</h2>
          <p class="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <a class="p-button">Learn More</a>
        </div>
        <div class="col-fixed" style="width: 48px"></div>
        <div class="col-12 lg:col box2 p-5">
          <h2 class="mb-4">Subheading 2</h2>
          <p class="mb-4">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <a class="p-button">Learn More</a>
        </div>
      </div>
    </section>
    <section class="container mb-7">
      <h3 class="mb-4">Section Heading</h3>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum.
      </p>
    </section>
    <section class="mb-7">
      <div class="grid">
        <div class="col-12 lg:col">
          <img
            alt="conference room"
            src="https://images.unsplash.com/photo-1462826303086-329426d1aef5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&q=80"
          />
        </div>
        <div class="col-12 lg:col-7 p-6">
          <h3 class="mb-4">Section Heading</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p><a href="#">Click here to learn more.</a></p>
        </div>
      </div>
    </section>
    <section class="mb-7">
      <div class="grid">
        <div class="col-12 lg:col-7 p-6">
          <h3 class="mb-4">Section Heading</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <p><a href="#">Click here to learn more.</a></p>
        </div>
        <div class="col-12 lg:col">
          <img
            alt="conference room"
            src="https://images.unsplash.com/photo-1634988115889-6fd7b3964ce5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=768&q=80"
          />
        </div>
      </div>
    </section>
    <section class="container mb-7">
      <div class="grid">
        <Card class="col-12 lg:col">
          <template #title>Triple Card Heading</template>
          <template #content>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </template>
          <template #footer>
            <Button icon="pi pi-angle-double-right" label="Learn More" />
          </template>
        </Card>
        <div class="col-fixed" style="width: 32px"></div>
        <Card class="col-12 lg:col">
          <template #title>Triple Card Heading</template>
          <template #content>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </template>
          <template #footer>
            <Button icon="pi pi-angle-double-right" label="Learn More" />
          </template>
        </Card>
        <div class="col-fixed" style="width: 32px"></div>
        <Card class="col-12 lg:col">
          <template #title>Triple Card Heading</template>
          <template #content>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam.
            </p>
          </template>
          <template #footer>
            <Button icon="pi pi-angle-double-right" label="Learn More" />
          </template>
        </Card>
      </div>
    </section>
    <section class="dark text-center p-6 mb-7">
      <h2 class="white mb-4">Section Heading</h2>
      <p class="white w-9 m-auto mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <a href="#" class="p-button ghost dark">Get Started Today</a>
    </section>
    <section class="container">
      <div class="grid">
        <div class="col-6 lg:col text-center">
          <i class="pi pi-heart blue mb-3" style="font-size: 3rem"></i>
          <h4 class="mb-2">Icon Heading</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="col-6 lg:col text-center">
          <i class="pi pi-lock blue mb-3" style="font-size: 3rem"></i>
          <h4 class="mb-2">Icon Heading</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="col-6 lg:col text-center">
          <i class="pi pi-star blue mb-3" style="font-size: 3rem"></i>
          <h4 class="mb-2">Icon Heading</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
        <div class="col-6 lg:col text-center">
          <i class="pi pi-box blue mb-3" style="font-size: 3rem"></i>
          <h4 class="mb-2">Icon Heading</h4>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss">
$medium: 768px;
$large: 992px;

.home .hero {
  background: var(--black) url("/images/home-hero.jpg") top center no-repeat;
  text-align: center;
  margin-bottom: 40px;
  overflow: hidden;
  position: relative;

  .container {
    z-index: 10;
    position: relative;
    padding: 80px;

    @media all and (max-width: $medium) {
      padding: 40px;
    }

    h1 {
      color: var(--white);
      width: 975px;
      max-width: 100%;
      margin: auto;
      margin-bottom: 30px;

      @media all and (max-width: $large) {
        font-size: 37px;
        line-height: 47px;
      }

      @media all and (max-width: $medium) {
        font-size: 27px;
        line-height: 37px;
      }
    }

    p {
      z-index: 5;
      color: white;
      font-size: 21px;
      line-height: 30px;
      width: 500px;
      max-width: 100%;
      margin: auto;
      margin-bottom: 40px;

      @media all and (max-width: $medium) {
        font-size: 18px;
      }
    }
  }
}

.box1,
.box2 {
  border-radius: 12px;
  h2 {
    color: var(--blue);
  }
}

.box1 {
  background: url("/images/box1.png") center center no-repeat;
  background-size: cover;
}

.box2 {
  background: url("/images/box2.png") center center no-repeat;
  background-size: cover;
}

.bubbles {
  z-index: 0;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;

  .bubble {
    width: 60px;
    height: 60px;
    background: var(--blue);
    border-radius: 200px;
    position: absolute;
  }

  .x1 {
    transform: scale(0.9);
    opacity: 0.6;
    animation: moveclouds 15s linear infinite,
      sideWays 4s ease-in-out infinite alternate;
  }

  .x2 {
    left: 15%;
    transform: scale(0.6);
    opacity: 0.5;
    animation: moveclouds 25s linear infinite,
      sideWays 5s ease-in-out infinite alternate;
  }

  .x3 {
    left: 25%;
    transform: scale(0.8);
    opacity: 0.4;
    animation: moveclouds 20s linear infinite,
      sideWays 4s ease-in-out infinite alternate;
  }

  .x4 {
    left: 45%;
    transform: scale(0.6);
    opacity: 0.55;
    animation: moveclouds 18s linear infinite,
      sideWays 2s ease-in-out infinite alternate;
  }

  .x5 {
    left: 55%;
    transform: scale(0.8);
    opacity: 0.4;
    animation: moveclouds 27s linear infinite,
      sideWays 1s ease-in-out infinite alternate;
  }

  .x6 {
    left: 65%;
    transform: scale(0.4);
    opacity: 0.6;
    animation: moveclouds 17s linear infinite,
      sideWays 3s ease-in-out infinite alternate;
  }

  .x7 {
    left: 85%;
    transform: scale(0.8);
    opacity: 0.5;
    animation: moveclouds 22s linear infinite,
      sideWays 2s ease-in-out infinite alternate;
  }

  .x8 {
    left: 95%;
    transform: scale(0.3);
    opacity: 0.65;
    animation: moveclouds 12s linear infinite,
      sideWays 1s ease-in-out infinite alternate;
  }

  @keyframes moveclouds {
    0% {
      top: 500px;
    }

    100% {
      top: -500px;
    }
  }

  @keyframes sideWays {
    0% {
      margin-left: 0px;
    }

    100% {
      margin-left: 50px;
    }
  }
}

@media all and (max-width: $medium) {
  .x2,
  .x4,
  .x6,
  .x8 {
    display: none;
  }
}
</style>