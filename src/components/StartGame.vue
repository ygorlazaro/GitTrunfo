<template>
  <div>
    <div class="columns">
      <div class="column is-4">
        <UserCard login="ygorlazaro"></UserCard>
      </div>

      <div class="column is-4">
        <UserCard login="linus"></UserCard>
      </div>
    </div>

  </div>
</template>

<script>
import UserCard from "./UserCard";

export default {
  components: {
    UserCard
  }
};
</script>
