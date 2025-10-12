import { composeInitialProps } from "react-i18next";

const mockCalendarData = {
  year: 1404,
  monthNumber: 8,
  monthName: "مرداد",
  daysInMonth: 31,
  month_first_day: "چهارشنبه",
  month_first_day_date: "2025-07-23T00:00:00.000+03:30",
  holidays: [10, 15, 23],// be eshtebah dare az inja mikhone amma bayad az off_day bekhone
  daysInPreviousMonth: 30,
  pre_month_days:31,
  allowed_to_see_next_month: true,
  allowed_to_see_pre_month: true,
  has_group: true,
  date: "2025-08-03",
  current_credit:1400000,
  off_days: [
      "2025-07-24",
      "2025-07-23",
      "2025-07-31",
      "2025-08-01",
      "2025-08-07",
      "2025-08-08",
      "2025-08-14",
      "2025-08-15",
      "2025-08-21",
      "2025-08-20"
  ],
  "order": [
      {
          "day": "4",
          "date": "4",
          "survey_participation_complete": false,
          "reserves": [
              {
                  "order_id": 5952746,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "باقالی پلوبا مرغ",
                  "meal_id": 1,
                  "category_id": 3,
                  "status": "سرو شده"
              },
              {
                  "order_id": 5971214,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "دلستر",
                  "meal_id": 4,
                  "category_id": 5,
                  "status": "سرو شده"
              },
              {
                  "order_id": 5971215,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "سیب زمینی سرخ کرده",
                  "meal_id": 4,
                  "category_id": 9,
                  "status": "سرو شده"
              }
          ]
      },
      {
          "day": "5",
          "date": "5",
          "survey_participation_complete": false,
          "reserves": [
              {
                  "order_id": 5952755,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "چلو جوجه كباب تندوري",
                  "meal_id": 1,
                  "category_id": 3,
                  "status": "سرو شده"
              }
          ]
      },
      {
          "day": "6",
          "date": "6",
          "survey_participation_complete": true,
          "reserves": [
              {
                  "order_id": 5952762,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "چلو کباب لقمه",
                  "meal_id": 1,
                  "category_id": 3,
                  "status": "سرو شده"
              },
              {
                  "order_id": 5852762,
                  "no_take_away": false,
                  "count": 3,
                  "takeaway_count": 0,
                  "food_name": "چلو کباب لقمه",
                  "meal_id": 1,
                  "category_id": 3,
                  "status": "سرو شده"
              },
              {
                  "order_id": 5971239,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "چلو کباب لقمه",
                  "meal_id": 1,
                  "category_id": 3,
                  "status": "سرو شده"
              },
              {
                  "order_id": 5971240,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "دلستر",
                  "meal_id": 1,
                  "category_id": 5,
                  "status": "سرو شده"
              },
              {
                  "order_id": 5971241,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "ظرف  یکبار مصرف",
                  "meal_id": 1,
                  "category_id": 21,
                  "status": "سرو شده"
              }
          ]
      },
      {
          "day": "7",
          "date": "7",
          "survey_participation_complete": true,
          "reserves": [
              {
                  "order_id": 5952782,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "چلو جوجه كباب باربيكيو",
                  "meal_id": 1,
                  "category_id": 3,
                  "status": "سرو شده"
              },
              {
                  "order_id": 5984043,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "نوشابه قوطی",
                  "meal_id": 4,
                  "category_id": 5,
                  "status": "سرو شده"
              },
              {
                  "order_id": 5984697,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "اسنک ( سرو از 12 الی ساعت 16)",
                  "meal_id": 4,
                  "category_id": 9,
                  "status": "سرو شده"
              }
          ]
      },
      {
          "day": "8",
          "date": "8",
          "survey_participation_complete": false,
          "reserves": [
              {
                  "order_id": 5952794,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "چلو خورشت قیمه بادمجان",
                  "meal_id": 1,
                  "category_id": 3,
                  "status": "سرو شده"
              },
              {
                  "order_id": 5971292,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "چلو خورشت قیمه بادمجان",
                  "meal_id": 1,
                  "category_id": 3,
                  "status": "رزرو شده"
              },
              {
                  "order_id": 5971293,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "ظرف  یکبار مصرف",
                  "meal_id": 1,
                  "category_id": 21,
                  "status": "رزرو شده"
              },
              {
                  "order_id": 5986550,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "نوشابه",
                  "meal_id": 1,
                  "category_id": 5,
                  "status": "رزرو شده"
              },
              {
                  "order_id": 5986580,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "املت ( سرو تا ساعت 11:30)",
                  "meal_id": 4,
                  "category_id": 17,
                  "status": "سرو شده"
              }
          ]
      },
      {
          "day": "11",
          "date": "11",
          "survey_participation_complete": false,
          "reserves": [
              {
                  "order_id": 5952796,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "چلو خورشت قرمه سبزی",
                  "meal_id": 1,
                  "category_id": 3,
                  "status": "سرو شده"
              },
              {
                  "order_id": 5971310,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "زرشک  پلو با مرغ",
                  "meal_id": 1,
                  "category_id": 3,
                  "status": "سرو شده"
              },
              {
                  "order_id": 5971312,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "ظرف  یکبار مصرف",
                  "meal_id": 1,
                  "category_id": 21,
                  "status": "سرو شده"
              }
          ]
      },
      {
          "day": "12",
          "date": "12",
          "survey_participation_complete": false,
          "reserves": [
              {
                  "order_id": 5952798,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "چلو خورشت قیمه سیب زمینی",
                  "meal_id": 1,
                  "category_id": 3,
                  "status": "سرو شده"
              }
          ]
      },
      {
          "day": "13",
          "date": "13",
          "survey_participation_complete": false,
          "reserves": [
              {
                  "order_id": 5952764,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "چلو کباب لقمه",
                  "meal_id": 1,
                  "category_id": 3,
                  "status": "سرو شده"
              },
              {
                  "order_id": 5971325,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "چلو کباب لقمه",
                  "meal_id": 1,
                  "category_id": 3,
                  "status": "رزرو شده"
              },
              {
                  "order_id": 5971326,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "ظرف  یکبار مصرف",
                  "meal_id": 1,
                  "category_id": 21,
                  "status": "رزرو شده"
              }
          ]
      },
      {
          "day": "14",
          "date": "14",
          "survey_participation_complete": false,
          "reserves": [
              {
                  "order_id": 5952803,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "ته چین مرغ و بادمجان",
                  "meal_id": 1,
                  "category_id": 3,
                  "status": "رزرو شده"
              },
              {
                  "order_id": 5999029,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "املت ( سرو تا ساعت 11:30)",
                  "meal_id": 4,
                  "category_id": 17,
                  "status": "سرو شده"
              }
          ]
      },
      {
          "day": "15",
          "date": "15",
          "survey_participation_complete": false,
          "reserves": [
              {
                  "order_id": 5952810,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "عدس پلو با گوشت",
                  "meal_id": 1,
                  "category_id": 3,
                  "status": "رزرو شده"
              },
              {
                  "order_id": 5971336,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "همبرگر",
                  "meal_id": 1,
                  "category_id": 2,
                  "status": "رزرو شده"
              },
              {
                  "order_id": 5971337,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "دلستر",
                  "meal_id": 1,
                  "category_id": 5,
                  "status": "رزرو شده"
              },
              {
                  "order_id": 5971338,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "ظرف  یکبار مصرف",
                  "meal_id": 1,
                  "category_id": 21,
                  "status": "رزرو شده"
              },
              {
                  "order_id": 5971342,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "ماست و خیار",
                  "meal_id": 1,
                  "category_id": 1,
                  "status": "رزرو شده"
              }
          ]
      },
      {
          "day": "25",
          "date": "25",
          "survey_participation_complete": false,
          "reserves": [
              {
                  "order_id": 5952822,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "خوراک جوجه کباب با سیب زمینی",
                  "meal_id": 1,
                  "category_id": 2,
                  "status": "رزرو شده"
              }
          ]
      },
      {
          "day": "26",
          "date": "26",
          "survey_participation_complete": false,
          "reserves": [
              {
                  "order_id": 5952829,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "چلو  جوجه کباب ترش",
                  "meal_id": 1,
                  "category_id": 3,
                  "status": "رزرو شده"
              }
          ]
      },
      {
          "day": "27",
          "date": "27",
          "survey_participation_complete": false,
          "reserves": [
              {
                  "order_id": 5952766,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "چلو کباب لقمه",
                  "meal_id": 1,
                  "category_id": 3,
                  "status": "رزرو شده"
              }
          ]
      },
      {
          "day": "28",
          "date": "28",
          "survey_participation_complete": false,
          "reserves": [
              {
                  "order_id": 5952830,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "عدس پلو با گوشت",
                  "meal_id": 1,
                  "category_id": 3,
                  "status": "رزرو شده"
              }
          ]
      },
      {
          "day": "29",
          "date": "29",
          "survey_participation_complete": false,
          "reserves": [
              {
                  "order_id": 5953085,
                  "no_take_away": true,
                  "count": 1,
                  "takeaway_count": 0,
                  "food_name": "چلو خورشت قیمه سیب زمینی",
                  "meal_id": 1,
                  "category_id": 3,
                  "status": "رزرو شده"
              }
          ]
      }
  ],
  "meals": {
      "1": {
          "name": "ناهار",
          "color": "#ffca38"
      },
      "4": {
          "name": "بوفه",
          "color": "#3AFF2C"
      },
      "5": {
          "name": "شام",
          "color": "#5583FF"
      },
      "6": {
          "name": "افطار",
          "color": "#fff764"
      },
      "7": {
          "name": "صبحانه",
          "color": "#4DEBEB"
      },
      "8": {
          "name": "ناهار نمایشگاه",
          "color": "#ff7dad"
      },
      "10": {
          "name": "وعده",
          "color": "#FF407F"
      },
      "11": {
          "name": "بسته نوروزی",
          "color": "#ff3131"
      },
      "13": {
          "name": "بسته مناسبتی",
          "color": "#83e1ff"
      },
      "14": {
          "name": "بوفه نمایشگاه",
          "color": "#4417FF"
      }
  },
  "categories": {
      "1": {
          "title": "پیش غذای سرد",
          "icon": null,
          "order": 7.0
      },
      "2": {
          "title": "خوراک",
          "icon": null,
          "order": 2.0
      },
      "3": {
          "title": "غذای روز",
          "icon": null,
          "order": 1.0
      },
      "4": {
          "title": "غذای ویژه",
          "icon": null,
          "order": 4.0
      },
      "5": {
          "title": "نوشیدنی",
          "icon": null,
          "order": 8.0
      },
      "6": {
          "title": "سالاد",
          "icon": null,
          "order": 6.0
      },
      "7": {
          "title": "فست فود",
          "icon": null,
          "order": 18.0
      },
      "8": {
          "title": "شوربا",
          "icon": null,
          "order": 5.0
      },
      "9": {
          "title": "سایر",
          "icon": null,
          "order": 10.0
      },
      "10": {
          "title": "دسر",
          "icon": null,
          "order": 9.0
      },
      "11": {
          "title": "نان",
          "icon": null,
          "order": 16.0
      },
      "12": {
          "title": "کیک و شیرینی",
          "icon": null,
          "order": 13.0
      },
      "13": {
          "title": "تست",
          "icon": null,
          "order": 20.0
      },
      "14": {
          "title": "غذای سالگرد تولد",
          "icon": null,
          "order": 21.0
      },
      "15": {
          "title": "سالاد ویژه جشن",
          "icon": null,
          "order": 22.0
      },
      "16": {
          "title": "نوشیدنی سالگرد تولد",
          "icon": null,
          "order": 25.0
      },
      "17": {
          "title": "صبحانه",
          "icon": null,
          "order": 12.0
      },
      "18": {
          "title": "بسته افطاری",
          "icon": null,
          "order": 30.0
      },
      "19": {
          "title": "کمک به تهیه بسته های غذایی برای روستاهای سیل زده",
          "icon": null,
          "order": 35.0
      },
      "20": {
          "title": "بسته نوروز",
          "icon": null,
          "order": 40.0
      },
      "21": {
          "title": "بسته بندی بیرون بر",
          "icon": null,
          "order": 11.0
      },
      "980190963": {
          "title": "نوشیدنی سرد (زمان سرو ساعت 11 الی 17)",
          "icon": null,
          "order": 14.0
      },
      "980190964": {
          "title": "دسر ویژه جشن",
          "icon": null,
          "order": 24.0
      },
      "980190965": {
          "title": "پیش غذای سرد-ويژه جشن",
          "icon": null,
          "order": 23.0
      },
      "980190966": {
          "title": "نوشیدنی گرم",
          "icon": null,
          "order": 15.0
      },
      "980190967": {
          "title": "غذای حاضری",
          "icon": null,
          "order": 17.0
      },
      "980190968": {
          "title": "بسته سحري",
          "icon": null,
          "order": 31.0
      },
      "980190969": {
          "title": "غذای سلامت",
          "icon": null,
          "order": 3.0
      },
      "980190970": {
          "title": "بسته افطار شرکتی",
          "icon": null,
          "order": 41.0
      },
      "980190971": {
          "title": "صبحانه نمایشگاه",
          "icon": null,
          "order": 42.0
      },
      "980190972": {
          "title": "ناهار نمایشگاه",
          "icon": null,
          "order": 43.0
      },
      "980190973": {
          "title": "بوفه نمایشگاه",
          "icon": null,
          "order": 44.0
      },
      "980190974": {
          "title": "بسته ی مناسبتی",
          "icon": null,
          "order": 45.0
      }
  },
  "notifications": [
      {
          "id": 2,
          "to_date": "---",
          "from_date": "1200/04/10",
          "title": "qr reminder",
          "editable": false,
          "status": true,
          "priority": 2,
          "view": false,
          "en_description": "Click on the following link to receive your today QR",
          "fa_description": "برای دریافت بارکد سفارش امروز بر روی لینک زیر کلیک کنید محل تحویل",
          "link": [
              {
                  "id": 3500966,
                  "code": "f40a155ef29223831b0c19bde89826d4",
                  "meal": "ناهار",
                  "resturant": "رستوران دفتر مرکزی",
                  "vendor": "پیمانکار غذای دفتر مرکزی"
              }
          ]
      }
  ],
    delivery_places:{
        "default_delivery_place": 1,
        "delivery_places": [
            {
            "delivery_place_id": 1,
            "restaurant": {
                "id": 1,
                "name": "رستوران دفتر مرکزی",
                "location": "ساختمان مرکزی"
            },
            "vendor": {
                "id": 1,
                "name": "پیمانکار غذای دفتر مرکزی"
            },
            "meal": {
                "id": 1,
                "name": "ناهار"
            }
            },
            {
            "delivery_place_id": 27,
            "restaurant": {
                "id": 2,
                "name": "رستوران سایت امام خمینی",
                "location": "شادآباد - سایت امام خمینی"
            },
            "vendor": {
                "id": 17,
                "name": "پیمانکار غذای سایت امام خمینی"
            },
            "meal": {
                "id": 1,
                "name": "ناهار"
            }
            },
            {
            "delivery_place_id": 28,
            "restaurant": {
                "id": 2,
                "name": "رستوران سایت امام خمینی",
                "location": "شادآباد - سایت امام خمینی"
            },
            "vendor": {
                "id": 17,
                "name": "پیمانکار غذای سایت امام خمینی"
            },
            "meal": {
                "id": 5,
                "name": "شام"
            }
            },
            {
            "delivery_place_id": 14,
            "restaurant": {
                "id": 1,
                "name": "رستوران دفتر مرکزی",
                "location": "ساختمان مرکزی"
            },
            "vendor": {
                "id": 2,
                "name": "بوفه دفتر مرکزی"
            },
            "meal": {
                "id": 4,
                "name": "بوفه"
            }
            },
            {
            "delivery_place_id": 15,
            "restaurant": {
                "id": 2,
                "name": "رستوران سایت امام خمینی",
                "location": "شادآباد - سایت امام خمینی"
            },
            "vendor": {
                "id": 4,
                "name": "بوفه  سایت امام خمینی"
            },
            "meal": {
                "id": 4,
                "name": "بوفه"
            }
            },
            {
            "delivery_place_id": 52,
            "restaurant": {
                "id": 10,
                "name": "نمایشگاه",
                "location": ""
            },
            "vendor": {
                "id": 24,
                "name": "پیمانکار نمایشگاه"
            },
            "meal": {
                "id": 1,
                "name": "ناهار"
            }
            },
            {
            "delivery_place_id": 53,
            "restaurant": {
                "id": 10,
                "name": "نمایشگاه",
                "location": ""
            },
            "vendor": {
                "id": 24,
                "name": "پیمانکار نمایشگاه"
            },
            "meal": {
                "id": 7,
                "name": "صبحانه"
            }
            },
            {
            "delivery_place_id": 59,
            "restaurant": {
                "id": 10,
                "name": "نمایشگاه",
                "location": ""
            },
            "vendor": {
                "id": 24,
                "name": "پیمانکار نمایشگاه"
            },
            "meal": {
                "id": 4,
                "name": "بوفه"
            }
            },
            {
            "delivery_place_id": 60,
            "restaurant": {
                "id": 17,
                "name": "همکف ساختمان مرکزی",
                "location": "ساختمان مرکزی"
            },
            "vendor": {
                "id": 25,
                "name": "خدمات پشتیبانی و سازمانی"
            },
            "meal": {
                "id": 13,
                "name": "بسته مناسبتی"
            }
            }
        ],
        "has_group": true
    },
    reserve:{
    "calories_required": 1965.32,
    "consumed_calories": 1350,
    "meal_calory": 1965.32,
    "meal": "ناهار",
    "restaurant": "رستوران دفتر مرکزی",
    "vendor": "پیمانکار غذای دفتر مرکزی",
    "delivery_place_id": 1,
    "delivery_place_times": [
        {
        "window_number": 0,
        "start_time": "12:00",
        "end_time": "15:30",
        "remain_capacity": "---"
        }
    ],
    "date": "دوشنبه, 1404/مرداد/27",
    "current_credit": 2147670,
    "min_credit": -2500000,
    "has_reserved_food_in_another_restaurant": null,
    "another_restaurant": null,
    "qr": "dd4e8f4532e3129106b0e703f4fdcc75",
    "window_numbner": 1,
    "categories": [
        {
        "id": 3,
        "title": "غذای روز",
        "order": 1,
        "limit": 1,
        "food": [],
        "reserved_food": [
            {
            "id": 1,
            "food_profile_id": 35,
            "rate": 1.5,
            "participation_count": 464,
            "calory": 1350,
            "food_profile_fa": "برنج + گوشت گوسفندی + گوجه کبابی",
            "food_profile_en": "Rice + Barbecued Tomato + Lamb meat",
            "name": "چلو کباب لقمه",
            "number_of_food": 0,
            "has_no_time_limit": false,
            "no_take_away": false,
            "is_favorite": false,
            "price": 209000,
            "price_id": 13117,
            "order_id": 5952766,
            "count": 1,
            "takeaway_count": 0,
            "status": "رزرو شده",
            "picture": {
                "original": "/system/pictures/files/000/000/184/original/%DA%86%D9%84%D9%88_%DA%A9%D8%A8%D8%A7%D8%A8_%DA%A9%D9%88%D8%A8%DB%8C%D8%AF%D9%87-_copy.jpg?1610179172",
                "thumb": "/system/pictures/files/000/000/184/thumb/%DA%86%D9%84%D9%88_%DA%A9%D8%A8%D8%A7%D8%A8_%DA%A9%D9%88%D8%A8%DB%8C%D8%AF%D9%87-_copy.jpg?1610179172"
            },
            "special_dish": false
            }
        ]
        },
        {
        "id": 2,
        "title": "خوراک",
        "order": 2,
        "limit": 1,
        "food": [],
        "reserved_food": []
        },
        {
        "id": 980190969,
        "title": "غذای سلامت",
        "order": 3,
        "limit": 1,
        "food": [],
        "reserved_food": []
        },
        {
        "id": 8,
        "title": "شوربا",
        "order": 5,
        "limit": 1,
        "food": [],
        "reserved_food": []
        },
        {
        "id": 6,
        "title": "سالاد",
        "order": 6,
        "limit": 1,
        "food": [],
        "reserved_food": []
        },
        {
        "id": 1,
        "title": "پیش غذای سرد",
        "order": 7,
        "limit": 1,
        "food": [],
        "reserved_food": []
        },
        {
        "id": 5,
        "title": "نوشیدنی",
        "order": 8,
        "limit": 1,
        "food": [
            {
            "id": 340,
            "rate": 4,
            "participation_count": 280,
            "food_profile_id": 119,
            "calory": 105,
            "food_profile_fa": "دلستر 330ml",
            "food_profile_en": "Non-alcoholic beer  330ml",
            "name": "دلستر",
            "number_of_food": "unlimited",
            "has_no_time_limit": true,
            "no_take_away": true,
            "is_favorite": false,
            "price": 18853,
            "price_id": 16110,
            "picture": {
                "original": "/system/pictures/files/000/000/250/original/bee2r.jpg?1610429252",
                "thumb": "/system/pictures/files/000/000/250/thumb/bee2r.jpg?1610429252"
            },
            "special_dish": false
            },
            {
            "id": 55,
            "rate": 3.5,
            "participation_count": 110,
            "food_profile_id": 118,
            "calory": 56,
            "food_profile_fa": "دوغ 250 ml",
            "food_profile_en": "Dough 250 ml",
            "name": "دوغ",
            "number_of_food": "unlimited",
            "has_no_time_limit": true,
            "no_take_away": true,
            "is_favorite": false,
            "price": 17272,
            "price_id": 16111,
            "picture": {
                "original": "/system/pictures/files/000/000/249/original/Dough2.jpg?1610429131",
                "thumb": "/system/pictures/files/000/000/249/thumb/Dough2.jpg?1610429131"
            },
            "special_dish": false
            },
            {
            "id": 444,
            "rate": 3,
            "participation_count": 17,
            "food_profile_id": 1295,
            "calory": 1,
            "food_profile_fa": "1 عدد نوشابه تکنفره (برند مورد تایید ایرانسل) قوطی",
            "food_profile_en": "1 can of single-serve soft drink (Irancell approved brand)",
            "name": "نوشابه",
            "number_of_food": "unlimited",
            "has_no_time_limit": true,
            "no_take_away": true,
            "is_favorite": false,
            "price": 17260,
            "price_id": 16109,
            "picture": {
                "original": "/system/pictures/files/000/001/966/original/food.jpg?1737963120",
                "thumb": "/system/pictures/files/000/001/966/thumb/food.jpg?1737963120"
            },
            "special_dish": false
            }
        ],
        "reserved_food": []
        },
        {
        "id": 9,
        "title": "سایر",
        "order": 10,
        "limit": 1,
        "food": [],
        "reserved_food": []
        },
        {
        "id": 21,
        "title": "بسته بندی بیرون بر",
        "order": 11,
        "limit": 6,
        "food": [
            {
            "id": 723,
            "rate": 3,
            "participation_count": 611,
            "food_profile_id": 949,
            "calory": 0,
            "food_profile_fa": "-",
            "food_profile_en": "-",
            "name": "ظرف  یکبار مصرف",
            "number_of_food": "unlimited",
            "has_no_time_limit": true,
            "no_take_away": true,
            "is_favorite": false,
            "price": 10000,
            "price_id": 13535,
            "picture": {
                "original": "/system/pictures/files/000/001/333/original/%D8%B8%D8%B1%D9%81_%DB%8C%DA%A9%D8%A8%D8%A7%D8%B1_%D9%85%D8%B5%D8%B1%D9%81.jpg?1669123839",
                "thumb": "/system/pictures/files/000/001/333/thumb/%D8%B8%D8%B1%D9%81_%DB%8C%DA%A9%D8%A8%D8%A7%D8%B1_%D9%85%D8%B5%D8%B1%D9%81.jpg?1669123839"
            },
            "special_dish": false
            },
            {
            "id": 722,
            "rate": 4.55,
            "participation_count": 193,
            "food_profile_id": 950,
            "calory": 0,
            "food_profile_fa": "-",
            "food_profile_en": "-",
            "name": "قاشق و چنگال یکبارمصرف",
            "number_of_food": "unlimited",
            "has_no_time_limit": true,
            "no_take_away": true,
            "is_favorite": false,
            "price": 7000,
            "price_id": 13538,
            "picture": {
                "original": "/system/pictures/files/000/001/334/original/%DA%A9%D8%A7%D8%AA%D9%84%D8%B1%DB%8C.jpg?1669123878",
                "thumb": "/system/pictures/files/000/001/334/thumb/%DA%A9%D8%A7%D8%AA%D9%84%D8%B1%DB%8C.jpg?1669123878"
            },
            "special_dish": false
            }
        ],
        "reserved_food": []
        },
        {
        "id": 980190967,
        "title": "غذای حاضری",
        "order": 17,
        "limit": 1,
        "food": [
            {
            "id": 1109,
            "rate": 3.45,
            "participation_count": 17,
            "food_profile_id": 1683,
            "calory": 855,
            "food_profile_fa": "\tجوجه (300 گرم) + گوجه فرنگی + خیارشور + فلفل + ترشی کلم + سیب زمینی سرخ شده",
            "food_profile_en": "Chicken (300 gr) + Tomato + Pickled Cucamber + Pepper + Sauerkraut + French Fries",
            "name": "خوراک جوجه کباب (RTE)",
            "number_of_food": 11,
            "has_no_time_limit": true,
            "no_take_away": false,
            "is_favorite": false,
            "price": 182400,
            "price_id": 16409,
            "picture": {
                "original": "/system/pictures/files/000/002/419/original/%D8%AE%D9%88%D8%B1%D8%A7%DA%A9_%D8%AC%D9%88%D8%AC%D9%87_%DA%A9%D8%A8%D8%A7%D8%A8.jpg?1751955405",
                "thumb": "/system/pictures/files/000/002/419/thumb/%D8%AE%D9%88%D8%B1%D8%A7%DA%A9_%D8%AC%D9%88%D8%AC%D9%87_%DA%A9%D8%A8%D8%A7%D8%A8.jpg?1751955405"
            },
            "special_dish": false
            }
        ],
        "reserved_food": []
        }
    ]
    }
};

export default mockCalendarData;


// tozihate order ke mikhaym ba ham poreshon konim
// to mackCalendarDate ye object darim be name order ke cadr har roz ro ba on por mikonim
// avval inke ye day darim ke barye hamon roze masalan day 6 baraye roz 6 on mah hastesh va ettelaat bayad to roz 6 beshine
// survey_participation_complete ke neshon mide survey sherkat karde ya na
// ke to ghesmate paiin cadre roz miyad va samte mokhalefe adade roz age false bashe kalame sabte emtiyaz miyad ke badan migam che kar mikone

// to har cadr ghazaha ya hamon ordera list mikhan beshan ke esme ghaza miyad ba tedade ona ke tedad dakhele parantez hastesh fildashon food_name va count hastesh

// agar baraye yek roz orderi nadashtim ye dar in roz ghaza sefaresh nadadid dakhelesh miyad ke baraye rozaye gozashte tosi bara ayande sabz va emroz narengi Meshe

// bara ye roz bishtar az 4 order ... be onvane iteme 5 miyadneveshteha rast bara rtl va chap bara ltr hastesh

// afzodane order be rozhaye ayande 
// beyne title body va footer jodakonande tavasote border nabashe
// bala samte mokhalefe close benevise rezerve ghaza va dakhele parantez tarikhe shamsi
// body ro 3ta row zire ham bezar ke colle modal ro gerefte ba margin mx-2 
// row avval 
// ye div ba bg-grey-100 ke dakhelesh 2ta bottom hastesh ke harkodom faal she backgrandesh orange mishe dar gheyre in sorat  back nadare 
// row dovvom 5 ta div dare ba width 1/3om ke harkodom ye label bala dare va ye input paiinesh
// be tartib bara tarikh restoran peymankar vade ghazaii va baze zamani hastesh
// tarikh date picker hastesh baghiye dropdown 
// row sevvom az divhaye merbot be grouh haye ghazaii tashkil mishe ke be tedad grouh haye ghazaii hasteshhar grouh ghabeliyade bazo baste shodan dare be sorate colaps , ke ye title dare to khate paiine title divhaii hastan ke be tedad ghazaha mibashan ke shamele ettelaate zir mishan : az ye samt ye icone bara balk ke pishnahadan calander bashe , ye chackbox bashe ke halate deactivesh faghat bordere narenji bashe va vaghti active shod backgrange narenji ba tik sefid bashe , badesh ye div ba radiose 50% bara axe ghaza bashe bade on name ghaze bashe , bade on ye div bashe ke dakhelesh felan 2ta div bashe bara dar restoran va biron bar , bade on ye adad bashe ke rate ro mige va badesh icon start be sorate narenji bashe bad gheymate ghaza va dar nahayat kalameye toman
