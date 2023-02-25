<template>
  <div class="home">
    <Html lang="en">
      <Head>
        <Title>Harcorp LLC | Overview</Title>
      </Head>
    </Html>
    <section class="hero mb-8">
      <div class="container">
        <h1>
          We strive to provide an excellent customer experience, customer care
          and job completion for all our clients.
        </h1>
        <p>
          Harcorp is a management company that will take on contract task
          requirements and give recommendations on how to best execute an action
          plan to conclusion.
        </p>
        <a href="mailto:bids@harcorp.org" class="p-button">
          Contact Us To Get A Quote
        </a>
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
    <section class="container mb-5">
      <div class="grid">
        <div class="col-12 lg:col box1 p-5 mb-4">
          <h2 class="mb-4">Harcorp Contract Management Program</h2>
          <p class="mb-4">
            Harcorp will manage multiple service agreements into one. We do not
            maintain or repair equipment. Our contract management program will
            offer any entity reduced costs, vendor flexibility all with a single
            point of contact.
          </p>
          <nuxt-link to="/covered-equipment" class="p-button">
            Learn More
          </nuxt-link>
        </div>
      </div>
    </section>
    <section class="mb-6">
      <div class="grid">
        <div class="col-12 lg:col mb-4">
          <img
            alt="laptop opened to a analytics dashboard in a virtual workspace"
            src="/images/virtual-workspace.jpg"
          />
        </div>
        <div class="col-12 lg:col-7 p-4 lg:p-8 mb-4">
          <h3 class="mb-4">Virtual Workspace</h3>
          <p class="mb-4">
            Harcorp will provide a virtual workspace that will give your team
            access to their workspace based on your company profiles. This will
            allow your team to track and manage every opportunity you wish to
            pursue.
          </p>
          <p>
            <a href="mailto:info@harcorp.org">
              Contact us to learn more
              <i class="pi pi-angle-double-right" style="font-size: 0.75rem" />
            </a>
          </p>
        </div>
      </div>
    </section>
    <section class="mb-6">
      <div class="grid">
        <div
          class="col-12 lg:col-7 flex-order-1 lg:flex-order-0 p-4 lg:p-8 lg:p-8 mb-4"
        >
          <h3 class="mb-4">Bid Sourcing</h3>
          <p class="mb-4">
            Harcorp will provide targeted leads directly to your inbox or to
            your virtual workspace. Regional package to include bidding
            opportunities from state, local, and federal jurisdictions. These
            would be leads sent directly to your inbox.
          </p>
          <p>
            <a href="mailto:info@harcorp.org">
              Contact us to learn more
              <i class="pi pi-angle-double-right" style="font-size: 0.75rem" />
            </a>
          </p>
        </div>
        <div class="col-12 lg:col flex-order-0 lg:flex-order-1 mb-4">
          <img
            alt="desktop computer with a bright abstract background with an iPhone charging in the foreground"
            src="/images/bid-sourcing.jpg"
          />
        </div>
      </div>
    </section>
    <section class="dark lg:text-center p-6 mb-7">
      <h2 class="white mb-4">About Us</h2>
      <p class="white lg:w-9 m-auto mb-4">
        Harcorp is a management firm incorporated in 2018. Harcorp is a CBE
        small business, our companies' policies and procedures are based on
        industry standards established throughout the nation.
      </p>
      <a href="mailto:bids@harcorp.org" class="p-button ghost dark">
        Contact Us & Get A Quote
      </a>
    </section>
    <section class="container">
      <div class="grid">
        <Card class="col-12 lg:col mb-4">
          <template #title>NAICS Codes</template>
          <template #content>
            <li>
              <strong>811210</strong> (Electronic and Precision Equipment repair
              and maintenance)
            </li>
            <li>
              <strong>551114</strong> (Corporate, subsidiary, regional
              management office)
            </li>
            <li><strong>561110</strong> (Office administration service).</li>
          </template>
        </Card>
        <div class="col-fixed" style="width: 32px"></div>
        <Card class="col-12 lg:col mb-4">
          <template #title>CBE Certification</template>
          <template #content>
            <p>Our CBE # is <strong>LSZR6077207202</strong>.</p>
          </template>
        </Card>
        <div class="col-fixed" style="width: 32px"></div>
        <Card class="col-12 lg:col mb-4">
          <template #title>Join Our Network</template>
          <template #content>
            <p>
              <a href="mailto:join@harcorp.org">Send us an email</a> if you'd
              like to learn more about joining our network!
            </p>
          </template>
          <template #footer>
            <a href="mailto:join@harcorp.org" class="plain">
              <Button icon="pi pi-angle-double-right" label="Learn More"
            /></a>
          </template>
        </Card>
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
  overflow: hidden;
  position: relative;

  .container {
    z-index: 10;
    position: relative;
    padding: 80px;

    @media all and (max-width: $medium) {
      padding: 40px 30px;
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
      width: 975px;
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