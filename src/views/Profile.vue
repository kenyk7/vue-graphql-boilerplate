<template>
  <div class="pag-profile">
    <section class="hero is-medium is-m" style="background-image: url(https://picsum.photos/1920/500?random)">
      <div class="hero-body">
      </div>
    </section>
    <div class="main-body">
      <div class="container">
        <div class="pag-profile__body">
          <div class="user-caption">
            <div class="user-caption__img">
              <img :src="'https://via.placeholder.com/250x250?text=@' + user.username" :alt="user.username"  width="150">
            </div>
            <h2 class="title is-2">@{{user.username}}</h2>
            <p class="subtitle">{{user.email}}</p>
            <div class="content-post-tag">
              <b-taglist attached>
                <b-tag type="is-dark">Posts</b-tag>
                <b-tag type="is-info">{{user._postsMeta.count}}</b-tag>
              </b-taglist>
            </div>
          </div>
          <br>
          <p>
            <router-link class="button is-primary" :to="{name: 'Logout'}">Logout</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.getters.me
    }
  }
}
</script>
<style lang="scss" scoped>
@media (min-width: 480px) {
  .pag-profile{
    &__body{
      margin-top: -125px;
    }
  }
}
.pag-profile{
  .hero{
    background-position: center center;
  }
  &__body{
    margin-top: -65px;
    text-align: center;
    margin-bottom: 1rem;
  }
}
.content-post-tag{
  display: flex;
  justify-content: center;
}

.user-caption{
  margin-top: 1rem;
  margin-bottom: 1rem;
  &__img{
    img{
      border: 4px solid #fff;
      border-radius: 50%;
      box-shadow: 0 2px 3px rgba(#000, 0.1);
    }
  }
}
</style>
