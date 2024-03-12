$(function(){
    let billetter = []; //Lager array
    let validering = true;
    $('#tabellBilletter').hide();

    $('#kjopBilett').click(function (){
        $('#tabellBilletter').show(); //Viser tabellheader når kjøp billett knappen trykkes

        //Definerer verdier brukt senere
        let ut;
        let filmInput = $('#filmer').val();
        let antallInput = $('#antallBilletter').val();
        let fornavnInput = $('#fornavn').val();
        let etternavnInput = $('#etternavn').val();
        let telefnrInput = $('#telefnr').val();
        let epostInput = $('#epost').val();

        $('.validering').text(''); //Tømmer div-boksene med feilmeldinger
        validering = true; // Reseter validering

        //Sjekker om brukeren har valgt noe annet en "default option"
        if (filmInput == 'fyllTekst'){
            $('#filmValidering').text('Velg en film!');
            validering = false;
        }
        //Sjekker om bruker har fylt inn et tall, større enn null
        if (antallInput == null || antallInput == 0){
            $('#antallValidering').text('Skriv inn et tall større enn null.');
            validering = false;
        }
        let regNavn = /^[a-zA-ZæøåÆØÅ]+$/; //Regex for navn med æøå
        if (regNavn.test(fornavnInput) === false || fornavnInput.trim() === ''){ //tester regex mot input
            $('#fornavnValidering').text('Må skrive inn fornavnet ditt.');
            validering = false;
        }//Trimmer whitespace for å sjekke om input er tom i fornavn og etternavn
        if (regNavn.test(etternavnInput) === false || etternavnInput.trim() === ''){
            $('#etternavnValidering').text('Må skrive inn etternavnet ditt.');
            validering = false;
        }
        //Regex for telefonnr, ulike antall sifre med landskode om bruker ønsker.
        const telefnrRegex = /^(\+\d{1,3})?[-.\s]?\d{1,3}([-.\s]?\d{2,3}){1,3}$/;
        if (!telefnrRegex.test(telefnrInput)) {
            $('#telefnrValidering').text('Skriv inn et gyldig tlfnr.');
            validering = false;
        }
        //regex for epost, tillatter ikke norske bokstaver: æøå.
        const epostRegex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        if (!epostRegex.test(epostInput)){
            $('#epostValidering').text('Skriv inn gyldig epost.');
            validering = false;
        }
        //Om validering er true kjøres dette
        if (validering) {
            //Lager et objekt som tar inn alle inputs og setter det inn i arrayet definert tidligere
            const billettKjop = {
                film: filmInput,
                antall: antallInput,
                fornavn: fornavnInput,
                etternavn: etternavnInput,
                telefonnr: telefnrInput,
                epost: epostInput
            };
            billetter.push(billettKjop);

            //Definerer utskriften og appender den til html tabellen
            ut += "<tr><td>" + billettKjop.film + "</td><td>" + billettKjop.antall + "</td><td>" +
                billettKjop.fornavn + "</td><td>" + billettKjop.etternavn + "</td><td>" + billettKjop.telefonnr
                + "</td><td>" + billettKjop.epost + "</td></tr>";
            $('#tabellBilletter').append(ut);

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
        //Tømmer arrayet billetter ved å lage et nytt som heter det samme bare uten noen verdier
        billetter = [];
        //Fjerner alle rader inni tbody unntatt den første som er table header
        $('#tabellBilletter tbody tr:not(:first-child)').empty();
        //Skjuler tableheader
        $('#tabellBilletter').hide();
        //console.log(billetter);
    });
});
