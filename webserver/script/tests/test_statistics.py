from django.test import TestCase
from rest_framework import status
from rest_framework.reverse import reverse
from rest_framework.test import APITestCase
from script.models.data import County
from script.models.statistics import Energy
from script.tests.utils import create_county, create_energy

class EnergyTests(APITestCase):

    county_name = 'Santa Cruz'
    residents = 9812
    year = 2019
    month = 10
    energy = 1234.5

    def test_create_energy(self):
        """
        Ensure we can create a new energy object.
        """
        _ = create_county(self.county_name, self.residents)
        response = create_energy(self.county_name, self.year, self.month, self.energy)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Energy.objects.count(), 1)
        obj = Energy.objects.get()
        self.assertEqual(obj.county.name, self.county_name)
        self.assertEqual(obj.year, self.year)
        self.assertEqual(obj.month, self.month)

    def test_filter_county(self):
        """
        Ensure we can filter energies by fields: county, year, month.
        """
        _ = create_county(self.county_name, self.residents)
        response = create_energy(self.county_name, self.year, self.month, self.energy)
        response = create_energy(self.county_name, self.year, 11, self.energy)
        url = reverse('county-list')
        data = {
            'county': self.county_name,
            'year': self.year,
            'month': self.month
        }
        response = self.client.get(url, data)
        obj = Energy.objects.get(county=self.county_name, year=self.year, month=self.month)
        self.assertEqual(obj.county.name, self.county_name)
        self.assertEqual(obj.year, self.year)
        self.assertEqual(obj.month, self.month)
        self.assertEqual(obj.energy, self.energy)