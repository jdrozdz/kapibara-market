import {NbpService} from "../nbp.service.ts";
import {NbpResponseModel} from "../nbp-response.model.ts";


describe('NBP API - exchange rates', () => {

    const nbpService: NbpService = new NbpService();

    test('Get all rates from NBP API', async () => {
        nbpService.getAllRates().subscribe((data: NbpResponseModel) => {
            expect(data.rates.length).toBeGreaterThan(0);
        });
    });

    test('Get last rates from NBP API (20 rates)', async () => {
        const last: number = 20;
        nbpService.getLastRates(last).subscribe((data: NbpResponseModel) => {
            expect(data.rates.length).toBe(last);
        })
    });

    test('Get today rates from NBP API for USD', async () => {
        const currencyCode: string = 'USD';
        nbpService.getTodayRateByCurrencyCode(currencyCode).subscribe((data: NbpResponseModel) => {
            expect(data.code).toBe(currencyCode);
            expect(data.rates.length).toBe(1);
        });
    })
});