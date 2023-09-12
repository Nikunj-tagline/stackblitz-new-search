import React, { useEffect, useState } from 'react';

const Homeone = () => {
  const [filters, setFilters] = useState({});

  const dataList = [
    {
      id: 1,
      name: 'foo',
      city: 'dallas',
      category: 'one',
      type: 'A',
      action: 'TRUE',
      data: 'data',
    },

    {
      id: 2,
      name: 'bar',
      city: 'dallas',
      category: 'two',
      type: 'B',
      action: 'FALSE',
      data: 'datatwo',
    },
    {
      id: 3,
      name: 'jim',
      city: 'san francisco',
      category: 'two',
      type: 'B',
      action: 'TRUE',
    },
    {
      id: 4,
      name: 'jane',
      city: 'denver',
      category: 'two',
      type: 'B',
      action: 'FALSE',
    },
    {
      id: 5,
      name: 'lee',
      city: 'america',
      category: 'three',
      type: 'C',
      action: 'FALSE',
    },
    {
      id: 6,
      name: 'yexh',
      city: 'america',
      category: 'three',
      type: 'D',
      action: 'FALSE',
    },
    {
      id: 7,
      name: 'alxe',
      city: 'JAPAN',
      category: 'four',
      type: 'D',
      action: 'FALSE',
    },
    {
      id: 8,
      name: 'pepper',
      city: 'JAPAN',
      category: 'four',
      type: 'E',
      action: 'TRUE',
    },
    {
      id: 9,
      name: 'blue',
      city: 'xyz',
      category: 'five',
      type: 'E',
      action: 'TRUE',
    },
    {
      id: 10,
      name: 'blue',
      city: 'xyz',
      category: 'five',
      type: 'E',
      action: 'FALSE',
    },
  ];

  const [searchText, setSearchText] = useState('');
  const [data, setData] = useState(dataList);

  useEffect(() => {
    const filteredData = dataList.filter((item) => {
      if (
        (!filters ||
          Object.values(filters).every(
            (filter) => !filter || filter.length === 0
          )) &&
        (searchText === '' ||
          item.name.toLowerCase().includes(searchText.toLowerCase()))
      ) {
        return true;
      }

      const conditions = [];
      getUniqKey(dataList).forEach((key) => {
        if (filters['selected' + key] && filters['selected' + key].length > 0) {
          conditions.push(filters['selected' + key].includes(item[key]));
        }
      });

      return (
        conditions.every((condition) => condition) &&
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    setData(filteredData);
  }, [filters, searchText]);

  const handleChange = (value, item, type) => {
    if (!item) {
      setSearchText(value);
    }
    getUniqKey(dataList).forEach((key) => {
      if (type === key) {
        let keyname = 'selected' + key;
        let selectedkeyvalue =
          filters && filters[keyname] ? [...filters[keyname]] : [];

        if (selectedkeyvalue.includes(item)) {
          let a = { ...filters };
          a[keyname] = selectedkeyvalue.filter((data) => data !== item);
          setFilters(a);
        } else {
          let a = { ...filters };
          a[keyname] =
            filters && filters[keyname] ? [...filters[keyname], item] : [item];
          setFilters(a);
        }
      }
    });
  };

  function getUniqKey(dataList) {
    let keys = [];
    dataList.forEach((element) => {
      Object.keys(element).forEach((key) => {
        keys.indexOf(key) < 0 && keys.push(key);
      });
    });
    return keys;
  }
  console.log(getUniqKey(dataList), 'abc');

  function filterUniqueValues(dataList, property) {
    let uniqvalue = [];
    dataList.forEach((element) => {
      element[property] &&
        uniqvalue.indexOf(element[property]) < 0 &&
        uniqvalue.push(element[property]);
    });
    return uniqvalue;
  }
  return (
    <div>
      <>
        <div>
          <table className="table">
            <thead>
              <tr>
                {getUniqKey(dataList).map((key) => (
                  <th scope="col">{key}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i}>
                  {getUniqKey(dataList).map((key) => (
                    <td scope="row">{item[key]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          Search:
          <input
            style={{ marginLeft: 5 }}
            type="text"
            placeholder="Type to search..."
            value={searchText}
            onChange={(e) => handleChange(e.target.value, null, 'search')}
          />
        </div>
        <div className="d-flex ">
          {getUniqKey(dataList)
            .filter((key) => !(key == 'id' || key == 'name'))
            .map((key) => (
              <div className="p-5">
                <h1>{key}</h1>
                {filterUniqueValues(dataList, key).map((item) => (
                  <>
                    <div className="d-flex">
                      <div className="form-check form-switch">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="flexSwitchCheckDefault"
                          checked={
                            filters['selected' + key] &&
                            filters['selected' + key].includes[item[key]]
                          }
                          onChange={(e) => handleChange(e, item, key)}
                        />
                        <label className="form-check-label">{item}</label>
                      </div>
                    </div>
                  </>
                ))}
              </div>
            ))}
        </div>
      </>
    </div>
  );
};

export default Homeone;
