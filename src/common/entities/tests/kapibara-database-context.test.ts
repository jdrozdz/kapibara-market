import {KapibaraContext} from "../kapibara.context";
import {NbpService} from "../../../api/services/nbp/nbp.service";


describe('Database Context', () => {
    let context: KapibaraContext;
    let nbpService: NbpService;

    beforeEach(async () => {
        KapibaraContext.IN_MEMORY = true;
        context = new KapibaraContext();
        nbpService = new NbpService();
        await context.build();
    });

    test('Should return the database context', () => {
        expect(context.instance).toBeTruthy();
    });

    test('Should create database scheme', () => {

    });

    test('Should pull USD rate and insert data to table `currency`', () => {

    });
})