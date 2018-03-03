module.exports = function solveSudoku(matrix) {
  
  var candArr = JSON.parse(JSON.stringify(matrix))
  
  var effect = 0;
  
  function test(){
    var testSum = 0;
     for (var row = 0; row < 9; row++) {
      for (var col = 0; col < 9; col++) {
        testSum += matrix[row][col];
      }
     }
    if(testSum == 405){
      return true;
    }
    else{return false;}
    

  }
  
  function singleFinder() {
    effect = 0;
    for (var row = 0; row < 9; row++) {
      for (var col = 0; col < 9; col++) {
        if (matrix[row][col] != 0) {
          candArr[row][col] = "solv";
        }
        if (matrix[row][col] == 0) {
          var inField = [];
          for (var i = 0; i < 9; i++) {
            inField.push(matrix[row][i]);
            inField.push(matrix[i][col]);
          }
          var sectRow = Math.floor(row / 3) * 3;
          var sectCol = Math.floor(col / 3) * 3;
          for (var j = 0; j < 3; j++) {
            for (var h = 0; h < 3; h++) {
              inField.push(matrix[sectRow + j][sectCol + h]);
            }
          }
          inField = inField.join("");
          var cellCand = "";
          for (var x = 1; x < 10; x++) {
            if (inField.indexOf(x) == -1) {
              cellCand += x;
            }
          }
          if (cellCand.length == 1) {
            effect = 1;
            matrix[row][col] = +cellCand[0]
            candArr[row][col] = 'solv';
          }
          if (cellCand.length > 1) {
            candArr[row][col] = cellCand;
            
          }
        }
      }
    } 
    if(effect != 0){
      singleFinder();
    }
  } 
  function hiddenFinderHor() {
    
     for (var row = 0; row < 9; row++) {
      for (var col = 0; col < 9; col++) {
        
          var candArrOne = candArr[row][col];
        if(candArrOne != 'solv'){
        for(var x = 0; x < candArrOne.length; x++){
          var candArrRowStr = ""
          for(var w = 0; w< 9; w++){
            if(w != col){
              candArrRowStr += candArr[row][w];
            }
          }
            if(candArrRowStr.indexOf(candArrOne[x]) < 0){
             //  console.log(row + " yo " + col);
              effect = 1
              matrix[row][col] = +candArrOne[x];
              candArr[row][col] =  "solv";
              x = 999;
            }        
          }          
        }       
      }
     }
     
  }
   function hiddenFinderVert() {
     
     for (var row = 0; row < 9; row++) {
      for (var col = 0; col < 9; col++) {
        
          var candArrOne = candArr[row][col];
        if(candArrOne != 'solv'){
        for(var x = 0; x < candArrOne.length; x++){
          var candArrRowStr = ""
          for(var w = 0; w< 9; w++){
            if(w != row){
              candArrRowStr += candArr[w][col];
            }
          }
            if(candArrRowStr.indexOf(candArrOne[x]) < 0){
              effect = 1
              matrix[row][col] = +candArrOne[x];
              candArr[row][col] =  "solv";
              x = 999;
              
            }    
          } 
        }
      }
     }
  }
  function hiddenFinderSq(){
    
     for (var row = 0; row < 9; row++) {
      for (var col = 0; col < 9; col++) {
        
          var candArrOne = candArr[row][col];
        if(candArrOne != 'solv'){
        for(var x = 0; x < candArrOne.length; x++){
          var candArrRowStr = ""
           var sectRow = Math.floor(row / 3) * 3;
          var sectCol = Math.floor(col / 3) * 3;
          for (var j = 0; j < 3; j++) {
            for (var h = 0; h < 3; h++) {
              if((sectRow + j != row) && (sectCol + h != col))
              candArrRowStr += candArr[sectRow + j][sectCol + h];
            }
          }
          for(var w = 0; w< 9; w++){
            if(w != row){
              candArrRowStr += candArr[w][col];
            }
          }
            if(candArrRowStr.indexOf(candArrOne[x]) < 0){
              effect = 1
              matrix[row][col] = +candArrOne[x];
              candArr[row][col] =  "solv";
              x = 999;
            }        
          }      
        }  
      }
     }
  
  }
  
  do{
    singleFinder();
    hiddenFinderHor();
    hiddenFinderVert();
    hiddenFinderSq();
    
  } while(effect != 0)
  
  
  //console.log(matrix);
  
}
