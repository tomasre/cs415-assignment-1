/*
 * GetInitials - Author:Darrel Daquigan
 * 
 * This process reads in a file of a list of names and ouputs 
 * a file of a list of corresponding initials
 * 
*/

'use strict'

(function() {
	
	os.ps.register('getInitials', main);

	function main() {

		async.waterfall([

			function (callback) {
				os.fs.length('rapper_names.csv', function (errorLength, length) {
					if (errorLength) {
						console.log('rapper_names.csv: error getting file length:' +
							errorLength + '\n');
						callback(errorLength);
					}
					else {
						console.log('VM: length success-------');
						callback(null, length);
					}
				});
			},

			function (length, callback) {
				os.fs.open('rapper_names.csv', function (errorOpen, fh) {
					if (errorOpen) {
						console.log('vector_data.csv: error opening file: ' +
							errorOpen + '\n');
						callback(errorOpen);
					}
					else {
						console.log('VM: open success----------');
						callback(null,length,fh);
					}
				});
			},

			function (length, fh, waterfallCallback) {
				var CHARS_TO_READ = 2;
				var currentPosition = 0; 
				var fullFile = '';

				function checkCompleted() {
					if (currentPosition >= length) 
						waterfallCallback(null, length, fh, fullFile);
					else readNextBlock();
				}

				function readNextBlock() {
					var charCount = currentPosition + CHARS_TO_READ > length ?
						length - currentPosition: CHARS_TO_READ;

					os.fs.read(fh, charCount, function (errorRead, data){
						if (errorRead){
							console.log('rapper_names.csv: error reading file:' +
								errorRead + '\n');
							waterfallCallback(errorRead);;
						}

						else {
							fullFile += data;
							console.log('VM: read success------');

							os.fs.seek(fh, charCount, function (errorSeek) {
								if (errorSeek) {
									console.log('rapper_names.csv: error seeking file:' +
										errorSeek + '\n');
									waterfallCallback(errorSeek);
								} else {
									currentPosition += charCount;
									console.log('VM: seek success------------');
									checkCompleted();
								}
							});
						}
					});
				}
			},

			function (length, fh, fullFile, callback){
				var outFile = createInitialsFile(fullFile);

				os.fs.write('rapper_initials', outFile, function(error){
					if(error) {
						console.log('rapper_initials.csv: error writing file ' +
							error + '\n');
						callback(error);
					} else{
						console.log('Done');
						callback(null);
					}
				});
			}

		], function (error,result) {
			if (error) console.log('get_initials: ERROR in execution. exited early');
			else{}
		})''

	}

	function createInitialsFile(fullData) {
		var initials = "";
		var initialsArray = result.content.split(",");

		for (var i = 0; i < initialsArray.length; i++){
			initials += initialsArray[i].split(' ').map(
				function (s){
					return s.charAt(0);
				}).join('');
			if ( i !== initialsArray.length -1) initials += ',';
		}

		return initials;
	}
})();