import _ from "lodash";
export const rename = (lang: string, data: any) => {
  if (!data.length) {
    if (data.name) {
      if (typeof data.name === "object") {
        data = { ...data, name: data.name[lang] };
      }
    }

    if (data.description) {
      data = { ...data, description: data.description[lang] };
    }

    if (data.address) {
      data = { ...data, address: data.address[lang] };
    }

    if (data.restaurant) {
      if (data.restaurant.description) {
        data = {
          ...data,
          "restaurant.description": data.restaurant.description[lang],
        };
      }

      if (data.restaurant.address) {
        data = {
          ...data,
          "restaurant.description": data.restaurant.description[lang],
        };
      }

      if (data.outerType) {
        let newOuterType: any[] = [];
        if (data.outerType.length) {
          data.outerType.map((f: any) => {
            const d = { name: "", types: [] };

            d.name = lang == "en" ? f.name : f.name_ar;

            // data.outerType = _.omit(data.outerType, "name_ar");

            if (f.types) {
              const types = f.types.map((x: any) => {
                x.value = lang == "en" ? x.value : x.value_ar;
                x = _.omit(x, "value_ar");

                return x;
              });
              d.types = types;
            }

            newOuterType.push(d);
          });
        }
        data.outerType = newOuterType;
      }
    }
  }
  if (data.length > 0) {
    data.forEach((d: any) => {
      if (d.name) {
        if (typeof d.name === "object") {
          d.name = d.name[lang];
        }
      }

      if (d.description) {
        d.description = d.description[lang];
      }

      if (data.address) {
        d.address = d.address[lang];
      }

      if (d.category) {
        d.category.name = d.category.name[lang];
      }

      if (d.Category) {
        // console.debug("ddd");
        // d.category.name = d.category.name[lang];
        const newCategory = d.Category.map((c: any) => {
          return { name: c.name[lang], icon: c.icon };
        });

        d.Category = newCategory;
      }

      if (d.restaurant) {
        if (d.restaurant.description) {
          d.restaurant.description = d.restaurant.description[lang];
        }

        if (d.restaurant.address) {
          d.restaurant.address = d.restaurant.address[lang];
        }
      }

      if (d.outerType) {
        let newOuterType: any[] = [];

        d.outerType.map((f: any) => {
          const v = { name: "", types: [] };

          v.name = lang == "en" ? f.name : f.name_ar;

          if (f.types) {
            // console.debug(f.types);
            const types = f.types.map((x: any) => {
              x.value = lang == "en" ? x.value : x.value_ar;
              x = _.omit(x, "value_ar");

              return x;
            });
            v.types = types;
          }
          // d.outerType = v;

          newOuterType.push(v);
        });

        d.outerType = newOuterType;

        //============================
        // d.outerType.name =
        //   lang == "en" ? d.outerType.name : d.outerType.name_ar;

        // d.outerType = _.omit(d.outerType, "name_ar");

        // if (d.outerType.types) {
        //   const types = d.outerType.types.map((type: any) => {
        //     type.value = lang == "en" ? type.value : type.value_ar;
        //     type = _.omit(type, "value_ar");

        //     return type;
        //   });

        //   d.outerType.types = types;
        // }
      }

      if (d.Items) {
        d.Items.forEach((i: any) => {
          if (i.name) {
            i.name = i.name[lang];
          }

          if (i.description) {
            i.description = i.description[lang];
          }

          if (i.outerType) {
            let newOuterType: any[] = [];

            i.outerType.map((f: any) => {
              const v = { name: "", types: [] };

              v.name = lang == "en" ? f.name : f.name_ar;

              if (f.types) {
                // console.debug(f.types);
                const types = f.types.map((x: any) => {
                  x.value = lang == "en" ? x.value : x.value_ar;
                  x = _.omit(x, "value_ar");

                  return x;
                });
                v.types = types;
              }
              newOuterType.push(v);
            });
            i.outerType = newOuterType;

            //========================================
            // i.outerType.name =
            //   lang == "en" ? i.outerType.name : i.outerType.name_ar;
            // i.outerType = _.omit(i.outerType, "name_ar");
            // if (i.outerType.types) {
            //   const types = i.outerType.types.map((type: any) => {
            //     type.value = lang == "en" ? type.value : type.value_ar;
            //     type = _.omit(type, "value_ar");
            //     return type;
            //   });
            //   i.outerType.types = types;
            // }
          }
        });
      }
    });
  }

  return data;
};

export const deLocalize = (data: any) => {
  let newData: any;

  if (!Array.isArray(data)) {
    newData = { ...data };

    if (data.name) {
      if (data.name.ar) {
        newData.name_ar = data.name.ar as string;
      }

      if (data.name.en) {
        newData.name = data.name.en as string;
      }
    }

    if (data.description) {
      if (data.description.en || data.description.en == "") {
        newData.description = data.description.en;
      }

      if (data.description.ar || data.description.ar == "") {
        newData.description_ar = data.description.ar;
      }
    }

    if (data.address) {
      if (data.address.en || data.address.en == "") {
        newData.address = data.address.en;
      }

      if (data.address.ar || data.address.ar == "") {
        newData.address_ar = data.address.ar;
      }
    }

    if (data.restaurant) {
      if (data.description) {
        if (data.description.en || data.description.en == "") {
          newData.description = data.description.en;
        }

        if (data.description.ar || data.description.ar == "") {
          newData.description_ar = data.description.ar;
        }
      }

      if (data.address) {
        if (data.address.en || data.address.en == "") {
          newData.address = data.address.en;
        }

        if (data.address.ar || data.address.ar == "") {
          newData.address_ar = data.address.ar;
        }
      }
    }

    if (data.category) {
      if (data.category.name.ar) {
        newData.category.name_ar = data.category.name.ar;
      }

      if (data.category.name.en) {
        newData.category.name = data.category.name.en;
      }
    }
  }

  if (Array.isArray(data) && data.length > 0) {
    newData = [...data];

    data.forEach((d: any, index: any) => {
      if (d.name) {
        if (d.name.ar) {
          newData[index].name_ar = d.name.ar as string;
        }

        if (d.name.en) {
          newData[index].name = d.name.en as string;
        }
      }

      if (d.description) {
        if (d.description.ar) {
          newData[index].description_ar = d.description.ar;
        }

        if (d.description.en) {
          newData[index].description = d.description.en;
        }
      }

      if (d.category) {
        if (d.category.name.en) {
          newData[index].category.name = d.category.name.en;
        }

        if (d.category.name.ar) {
          newData[index].category.name_ar = d.category.name.ar;
        }
      }

      if (d.restaurant) {
        if (d.restaurant.description) {
          if (
            d.restaurant.description.ar ||
            d.restaurant.description.ar == ""
          ) {
            newData[index].restaurant.description_ar =
              d.restaurant.description.ar;
          }

          if (
            d.restaurant.description.en ||
            d.restaurant.description.en == ""
          ) {
            newData[index].restaurant.description = d.restaurant.description.en;
          }
        }

        if (d.restaurant.address) {
          if (d.restaurant.address.ar || d.restaurant.address.ar == "") {
            newData[index].restaurant.address_ar = d.restaurant.address.ar;
          }

          if (d.restaurant.address.en || d.restaurant.address.en == "") {
            newData[index].restaurant.address = d.restaurant.address.en;
          }
        }
      }

      if (d.Items) {
        d.Items.forEach((i: any, itemIndex: any) => {
          if (i.name.ar) {
            newData[index].Items[itemIndex].name_ar = i.name.ar;
          }

          if (i.name.en) {
            newData[index].Items[itemIndex].name = i.name.en;
          }

          if (i.description.ar) {
            newData[index].Items[itemIndex].description_ar = i.description.ar;
          }

          if (i.description.en) {
            newData[index].Items[itemIndex].description = i.description.en;
          }
        });
      }
    });
  }

  return newData;
};

export const renameHardCoded = (lang: string, data: any) => {
  if (!data.length) {
    if (data.name) {
      data.name = lang == "en" ? data.name : data.name_ar;
      data = _.omit(data, "name_ar");
    }

    if (data.value) {
      data.value = lang == "en" ? data.value : data.value_ar;
      data = _.omit(data, "value_ar");
    }

    if (data.types) {
      data.types.forEach((t: any) => {});
    }
    return data;
  }

  let newData = [];
  if (data.length > 0) {
    newData = data.map((d: any) => {
      if (d.name) {
        d.name = lang == "en" ? d.name : d.name_ar;
        d = _.omit(d, "name_ar");
      }

      if (d.value) {
        d.value = lang == "en" ? d.value : d.value_ar;
        d = _.omit(d, "value_ar");
      }

      if (d.types) {
        d.types.forEach((t: any) => {});
      }

      return d;
    });
  }
  return newData;
};
