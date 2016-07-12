import { Mandant } from './mandant';
import { Injectable } from '@angular/core';
import { MANDANTS } from './mock-mandants';

@Injectable()
export class MandantService {
    getMandants() {
        return Promise.resolve(MANDANTS);
    }
    getMandantsSlowly() {
        return new Promise<Mandant[]>(resolve =>
            setTimeout(() => resolve(MANDANTS), 1) // 2 seconds
        );
    }

    getMandant(id: number) {
        return Promise.resolve(MANDANTS.filter(mandant => mandant.id === id)[0]);
    }
}
