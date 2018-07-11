class Monster
{
   constructor(id)
   {
      this.image = $(id);
      this.alive = true;
   }

   pos() {
      return this.image.get(0).getBoundingClientRect();
   }
}