from enum import Enum

class AggregationLevel(Enum):
    """Aggregation level"""
    STATE = 'state'
    COUNTY = 'county'
    ZIP = 'zip'


class POI(Enum):
    """Place of interest"""
    ALL = 'All'
    WORKPLACE = 'Workplace'
    DCFC = 'DC Fast Charger'
    RESIDENTIAL = 'Residential'
    PUBLIC_L2 = 'Public L2'
    UNKNOWN = 'Unknown'
    # [TODO] add more POIs


class POISub(Enum):
    """Place of interest sub-category"""
    HT = 'High-Tech'
    UNKNOWN = 'Unknown'
    # [TODO] add more POI sub-categories


class ChargingConnector(Enum):
    """Charging connector type"""
    CHADEMO = 'CHAdeMO'
    COMBO = 'Combo'
    J1772 = 'J1772'
    UNKNOWN = 'Unknown'
    # [TODO] add more connector types


class VehicleMake(Enum):
    """Vehicle make"""
    NISSAN = 'Nissan'
    CHEVROLET = 'Chevrolet'
    AUDI = 'Audi'
    BMW = 'BMW'
    HONDA = 'Honda'
    UNKNOWN = 'Unknown'
    # [TODO] add more vehicle makes


class EVType(Enum):
    """EV type"""
    PLUGIN = 'PLUGIN'
    HYBRID = 'HYBRID'
    UNKNOWN = 'UNKNOWN'
    # [TODO] add more EV types


class DayType(Enum):
    """Day type"""
    WEEKDAY = 'weekday'
    WEEKEND = 'weekend'
    PEAK = 'peak'
