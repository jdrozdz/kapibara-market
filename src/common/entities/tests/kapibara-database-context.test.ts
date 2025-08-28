import {KapibaraContext} from "../kapibara.context";
import {RatesEntity} from "../rates.entity";
import {CurrencyEntity} from "../currency.entity";
import {NbpService} from "../../../api/services/nbp/nbp.service";
import {map} from "rxjs";


describe('Database Context', () => {
    let context: KapibaraContext;
    let nbpService: NbpService;

    beforeEach(() => {
        context = new KapibaraContext();
        nbpService = new NbpService();
    });

    test('Should return the database context', () => {
        expect(context.context).toBeTruthy();
    });

    test('Should create database scheme', () => {

    });

    test('Should pull USD rate and insert data to table `currency`', () => {

    });
})