package oslomet.webprog;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class HomeController {
    private final ArrayList<Billetter> alleBilletter = new ArrayList<>();

    @PostMapping("/lagre")
    public void hentBilletter(Billetter innBillett){
        alleBilletter.add(innBillett);
    }
    @GetMapping("/hent")
    public ArrayList<Billetter> hentData(){
        return alleBilletter;
    }
    @GetMapping("/slettData")
    public void slettData(){
        alleBilletter.clear();
    }

}
