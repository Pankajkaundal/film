'use strict';

(function(){

class MoviesComponent {
  constructor($http, $scope, socket) {
      this.$http = $http;
      this.socket = socket;
      this.$scope = $scope;
      this.MovieData =[];
      this.MovieDetails =[];

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('moviesendpoint');
      });
    }

        FindMovie() {
          this.$http.get('https://api.themoviedb.org/3/search/movie?api_key=e98ca6e8024686f7117e1bb4fdfeaee5&query=' + this.MovieName + '&year=' + this.Year).then(response => {
            console.log(response.data.results[0].id);
            var MovieID = response.data.results[0].id;
            this.$http.get('https://api.themoviedb.org/3/movie/' + MovieID + '?api_key=e98ca6e8024686f7117e1bb4fdfeaee5').then(movieres => {
              this.MovieData = movieres.data;
              console.log(this.MovieData);
            });
          });
        }
//
//    SearchMovie(){
//       console.log('Function Called');
//       this.$http.get('https://moviesapi.com/m.php?t='+this.MovieName+'&y='+this.MovieYear+'&type=movie&r=json').then(response => {
//         var MovieID=response.data[0].id;
//         console.log(response.data);
//          this.$http.get('https://moviesapi.com/m.php?i='+MovieID+'&type=movie&r=json').then(response => {
//             this.MovieDetails = response.data;
//             console.log(this.MovieDetails);
//          });
//       });
//       //6cc2465de54ccddc20d280a067bef7fe
//   // console.log('Function Called');
//   //     this.$http.get('https://api.themoviedb.org/3/search/movie?api_key=6cc2465de54ccddc20d280a067bef7fe &query='+this.MovieName+'&year='+this.MovieYear+).then(response => {
//   //         var MovieID=response.data[0].id;
//   //       console.log(response.data);
//   //        this.$http.get('https://api.themoviedb.org/3/movie/'+MovieID+'?api_key=6cc2465de54ccddc20d280a067bef7fe ').then(response => {
//   //           this.MovieDetails = response.data;
//   //           console.log(this.MovieDetails);
//   //        });
//   //     });
//
//
//
// //       this.$http.get('https://api.themoviedb.org/3/search/movie?api_key=e98ca6e8024686f7117e1bb4fdfeaee5&query='+this.MovieName+'&year='+this.MovieYear).then(response=>{
// // console.log(response.data.result[0].id);
// // var MovieID=response.data.result[0].id;
// // this.http.get('https://api.themoviedb.org/3/movie/'+MovieID+'?api_key=e98ca6e8024686f7117e1bb4fdfeaee5').then(movieres=>{
// // this.MovieDetails=movieres.data;
// // console.log(this.MovieDetails);
// // });
// //  });
//
//   }
//
// /*  SearchMovie(){
//    console.log('Function Called');
//    this.$http.get('https://moviesapi.com/m.php?t='+this.MovieName+'&y='+this.MovieYear+'&type=movie&r=json').then(response => {
//      var MovieID=response.data[0].id;
//      console.log(response.data);
//       this.$http.get('https://moviesapi.com/m.php?i='+MovieID+'&type=movie&r=json').then(response => {
//          this.MovieDetails = response.data;
//          console.log(this.MovieDetails);
//       });
//    });
//
// }*/
//





  addMovie() {
 this.$http.post('/api/moviesendpoints', {
 //  MovieName: this.MovieName,
 //  Year: this.MovieDetails.year,
 //  Title: this.MovieDetails.title,
 //    StarCast: this.MovieDetails.cast,
 //    Duration: this.MovieDetails.dur,
 // Language: this.MovieDetails.lang,
 // Poster: this.MovieDetails.cov,
 // Genre:this.MovieDetails.gen
 Title: this.MovieData.original_title,
Duration: this.MovieData.runtime,
 Poster: this.MovieData.poster_path,
 Overview:this.MovieData.overview

 });
 }


 $onInit(){
       this.$http.get('/api/moviesendpoints').then(response => {
         this.MovieData = response.data;
         this.socket.syncUpdates('moviesendpoint', this.MovieData);
       });

  }



  remove(Movie){

       this.$http.delete('/api/moviesendpoints/' + Movie._id);

}


}

angular.module('projectApp')
  .component('movies', {
    templateUrl: 'app/movies/movies.html',
    controller: MoviesComponent,
    controllerAs: 'moviesCtrl'
  });

})();
