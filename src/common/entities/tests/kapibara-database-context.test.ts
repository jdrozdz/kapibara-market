import {KapibaraContext} from "../kapibara.context";
import {NbpService} from "../../services/nbp/nbp.service";


describe('Database Context', () => {
    let dbx: KapibaraContext;
    let nbpService: NbpService;

    beforeEach(async () => {
        nbpService = new NbpService();
    });

    test('Should return the database context', () => {

    });

    test('Should create database scheme', () => {

    });

    test('Should pull USD rate and insert data to table `currency`', () => {

    });
})