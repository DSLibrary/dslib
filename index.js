'use strict';

// var fs = require( 'fs' ),
//     components = fs.readdirSync( './dataStructures' ),
//     dslib = {},
//     i;

// // dynamically add all datastructures
// for ( i = 0; i < components.length; i++ ) {
//   var fileName = components[ i ].split( '.' )[0],
//       temp,
//       keys,
//       index;

//   if ( fileName[ 1 ] === '-' ) {
//     // edgecase for n-Tree and similar
//     // may cause problems for red-black tree
//     fileName = fileName[ 0 ] +
//                 fileName[ 2 ].toUpperCase() +
//                 fileName.substring( 3 );
//   } else {
//     fileName = fileName[ 0 ].toUpperCase() +
//                fileName.substring( 1 );
//   }
//   // I don't want to have to do this here,
//   // there should be an agreed upon format for structures
//   temp = require( './dataStructures/' +
//                   components[ i ] );
//   keys = Object.keys( temp );

//   // edgecase for files w/ multiple structures
//   // ( eg. quadTree )
//   if ( keys.length > 1 ){
//     for ( index = 0; index < keys.length; index++ ) {
//       dslib[ keys[ index ] ] = temp[ keys[ index ] ];
//     }
//   } else {
//     dslib[ fileName ] = temp;
//   }
// }

module.exports = {
  BinarySearchTree: require('./dataStructures/binarySearchTree'),
  BloomFilter: require('./dataStructures/bloomFilter'),
  DoublyLinkedList: require('./dataStructures/doublyLinkedList'),
  Graph: require('./dataStructures/graph'),
  Heap: require('./dataStructures/heap'),
  LinkedList: require('./dataStructures/linkedList'),
  Map: require('./dataStructures/map'),
  nTree: require('./dataStructures/n-tree'),
  Quadtree: require('./datastructures/quadTree'),
  Queue: require('./dataStructures/queue'),
  Set: require('./dataStructures/set'),
  SetStrict: require('./dataStructures/setStrict'),
  Stack: require('./dataStructures/stack'),
  Tree: require('./dataStructures/tree'),
  Trie: require('./dataStructures/trie')
};
