// module.exports.getDate = getDate;

// let getDate = function () {
//     let today = new Date();

//     let option = {
//         weekday: "long",
//         day: "numeric",
//         month: "long",
//     }

//     return today.toLocaleDateString("en-US", option);

// }

// // now this function is anymnous function
// // exports is the same as module.exports  
// exports.getDay = function () {
//     let today = new Date();

//     let option = {
//         day: "numeric",
//     }

//     return today.toLocaleDateString("en-US", option);
// }



// exports.getDate = function () {
//     const today = new Date();
  
//     const options = {
//       weekday: 'long',
//       day: 'numeric',
//       month: 'long'
//     };
  
//     return today.toLocaleDateString("en-US", options);
//   }
  
//   exports.getDay = function() {
//     const today = new Date();
  
//     const options = {
//       weekday: 'long'
//     };
  
//     return today.toLocaleDateString("en-US", options);
//   }