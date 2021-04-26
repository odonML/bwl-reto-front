import { Component, OnInit } from '@angular/core';
import { Datos } from 'src/app/models/datos';
import { Horas } from 'src/app/models/hora';
import { ZonaH } from 'src/app/models/zonaH';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  datos = new Datos();
  horas = new Horas();
  zonaH = new ZonaH();

  ver = false;
  countriesList = [
    { pais: 'México', img: '../../../assets/img/MEXICO.png' },
    { pais: 'United States', img: '../../../assets/img/USA.png' },
    { pais: 'Canada', img: '../../../assets/img/CANADA.png' },
  ];

  done = [
    { task: 'ir a correr' },
    { task: 'bañar a mi perro' },
    { task: 'pintar la sala' },
  ];
  pending = [
    { task: 'leer antes de dormir' },
    { task: 'dormir a las 9pm' },
    { task: 'despertar a las 6am' },
  ];
  constructor(private countries: CountriesService) {}

  ngOnInit() {}

  getCountry(pais: string, img: string) {
    this.showZoneH(pais); //zonas horarias
    const res = this.countries.getCountries(pais);
    res.subscribe((c: any) => {
      this.datos.clima = c.current.condition.text;
      this.datos.clima_icon = c.current.condition.icon;
      this.datos.temp_c = c.current.temp_c;
      this.datos.temp_f = c.current.temp_f;
      this.datos.pais = c.location.country;
      this.datos.bandera = img;

      this.horas.zone = c.location.tz_id;
      this.horas.hora = Date.parse(c.location.localtime);

      this.ver = true;
    });
  }

  showZoneH(pais: string) {
    if (pais === 'México') {
      this.zonaH.zona1 = 'Monterrey';
      this.zonaH.zona2 = 'Tijuana';
      this.zonaH.zona3 = 'Ciudad de Mexico';
    } else if (pais === 'Canada') {
      this.zonaH.zona1 = 'Winnipeg';
      this.zonaH.zona2 = 'Regina';
      this.zonaH.zona3 = 'Toronto';
    } else if (pais === 'United States') {
      this.zonaH.zona1 = 'Chicago';
      this.zonaH.zona2 = 'Denver';
      this.zonaH.zona3 = 'Phoenix';
    }
  }

  getZoneH(zone: string) {
    const res = this.countries.getZH(zone);
    res.subscribe((c: any) => {
      this.horas.zone = c.location.tz_id;
      this.horas.hora = Date.parse(c.location.localtime);
    });
  }

  addTask(task: string) {
    let p = this.pending.findIndex((e) => e.task === task);
    this.pending.splice(p, 1);
    this.done.push({ task: task });
  }
}
