   <!DOCTYPE html>
    <html>
    <head>
    <title>Read and Parse Lynis Log</title>

    <script>
    function processFiles(files) {
            var file = files[0];

            var textParsed = [];

            function onReadAsText(e) {
                var output = document.getElementById("fileOutput");
                output.textContent = output.textContent + e.target.result;

                var text = e.target.result;
                var lines = text.split("\n");

                for (var i= 0; i < lines.length; i++) {      
                    textParsed[i] = lines[i];
                }

                var testsPerformed = null;
                var suggestions = [];
                var suggestion = null;
                var auxSug = null;
                for (var j = 0; j < lines.length; j++) {
                    if (textParsed[j].includes("tests_executed")){
                        testsPerformed = textParsed[j];
                    }
                    if (textParsed[j].includes("suggestion[]")) {
                        suggestion = textParsed[j];
                        suggestions.push(suggestion);
                    }
                }

                if (typeof(Storage) !== "undefined" && textParsed.length >= 1) {
                //Store
                localStorage.setItem('storedText', textParsed);
                localStorage.setItem('tests', testsPerformed);
                localStorage.setItem('suggestions', suggestions);
                } 
            };

            for (var i = 0; i < files.length; i++){
                var reader = new FileReader();
                reader.onload = onReadAsText;
                reader.readAsText(files[i]);
            }


        }
</script>
</head>

<body>
<input id="fileInput" placeholder=":input" type="file" size="50" onchange="processFiles(this.files)" multiple>
<div id="fileOutput"></div>
</body>
</html>