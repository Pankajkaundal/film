'use strict';

import mongoose from 'mongoose';

var MoviesendpointSchema = new mongoose.Schema({
//   MovieName: String,
// Year: String,
//
// Poster: String,
//
// Title: String,
//   StarCast: String,
//   Duration: String,
// Language: String,
// Genre: String
Title: String,
Duration: String,
 Poster: String,
 Genre:String,
 Overview: String
});

export default mongoose.model('Movies', MoviesendpointSchema);
