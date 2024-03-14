$(function(){
    let validering = true;
    $('#tabellBilletter').hide();

    $('#kjopBilett').click(function (){
        $('#tabellBilletter').show(); //Viser tabellheader når kjøp billett knappen trykkes

        //Definerer verdier brukt senere
        let ut;
        const billett = {
            film: $('#filmer').val(),
            antall: $('#antallBilletter').val(),
            fornavn: $('#fornavn').val(),
            etternavn: $('#etternavn').val(),
            telefonNr:  $('#telefnr').val(),
            email: $('#epost').val()
        };

        $('.validering').text(''); //Tømmer div-boksene med feilmeldinger
        validering = true; // Reseter validering

        //Sjekker om brukeren har valgt noe annet en "default option"
        let filmInput = $("#filmer").val();
        if (filmInput == 'fyllTekst'){
            $('#filmValidering').text('Velg en film!');
            validering = false;
        }
        //Sjekker om bruker har fylt inn et tall, større enn null
        let antallInput = $("#antallBilletter").val();
        if (antallInput == null || antallInput == 0){
            $('#antallValidering').text('Skriv inn et tall større enn null.');
            validering = false;
        }
        let regNavn = /^[a-zA-ZæøåÆØÅ]+$/; //Regex for navn med æøå
        let fornavnInput = $("#fornavn").val();
        if (regNavn.test(fornavnInput) === false || fornavnInput.trim() === ''){ //tester regex mot input
            $('#fornavnValidering').text('Må skrive inn fornavnet ditt.');
            validering = false;
        }//Trimmer whitespace for å sjekke om input er tom i fornavn og etternavn
        let etternavnInput = $("#etternavn").val();
        if (regNavn.test(etternavnInput) === false || etternavnInput.trim() === ''){
            $('#etternavnValidering').text('Må skrive inn etternavnet ditt.');
            validering = false;
        }
        //Regex for telefonnr, ulike antall sifre med landskode om bruker ønsker.
        const telefnrRegex = /^(\+\d{1,3})?[-.\s]?\d{1,3}([-.\s]?\d{2,3}){1,3}$/;
        let telefnrInput = $("#telefnr").val();
        if (!telefnrRegex.test(telefnrInput)) {
            $('#telefnrValidering').text('Skriv inn et gyldig tlfnr.');
            validering = false;
        }
        //regex for epost, tillatter ikke norske bokstaver: æøå.
        const epostRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        let epostInput = $("#epost").val();
        if (!epostRegex.test(epostInput)){
            $('#epostValidering').text('Skriv inn gyldig epost.');
            validering = false;
        }
        //Om validering er true kjøres dette
        if (validering) {
            $.post("/lagre", billett, function (){
                hentData();
            });
            function hentData(){
                $.get("/hent", function (data){
                    formaterOutput(data);
                })
            }
            function formaterOutput(billetter){
                for(const billett of billetter){
                    ut += "<tr><td>" + billett.film + "</td><td>" + billett.antall + "</td><td>" +
                        billett.fornavn + "</td><td>" + billett.etternavn + "</td><td>" + billett.telefonNr
                        + "</td><td>" + billett.email + "</td></tr>";
                }
                $("#tabellRad1").html(ut);
            }

            //Reseter input til slutt slik at kunde kan skrive inn nye verdier
            $('#filmer').val('fyllTekst');
            $('#antallBilletter').val('');
            $('#fornavn').val('');
            $('#etternavn').val('');
            $('#telefnr').val('');
            $('#epost').val('');
        }
    });

    $('#slettAlle').click(function (){
        $.get("/slettData", function (){
            hentData();
        });
    });
});
