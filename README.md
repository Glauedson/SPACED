# <img src="src/assets/icons/logo1x1.png" width="23px"> SPACED

<div align="center" style="padding: 20px 0" >

<img src= "src/assets/icons/SPACED-02.png" width=290px>
</div>

Site desenvolvido usando APIs de astronomia da **NASA**, esse projeto não foi um trabalho da faculdade, apenas uma ideia que eu tive depois que encontrei as **APIs gratuitas** da NASA, após analisar todas os dados tive essa vontade de desenvolver este site.

> [!NOTE]
> 
> Todas as **APIs** da **NASA** são de uso livre, mas primeiro você tem que fazer login com seu **EMAIL** no site para receber sua **APIKEY**.

## <img src="src/assets/icons/logo1x1.png" width=19 > Topicos

- [Descrição do Projeto](#descrição-do-projeto)
- [Screenshots Do Projeto](#screenshots-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Endpoints das APIs](#endpoints-das-apis)
- [Licença](#licença)
- [Contato](#contato)

## <img src="src/assets/icons/logo1x1.png" width=19 > Descrição do Projeto

Assim que todas funcionalidades do projeto forem definidas, irei atualizar a descrição do projeto

## <img src="src/assets/icons/logo1x1.png" width=19 > Screenshots do Projeto

🚧 Logo será atualizado

## <img src="src/assets/icons/logo1x1.png" width=19 > Tecnologias Utilizadas

- **Frontend**:

  [![My Skills](https://skillicons.dev/icons?i=react,vite,css)](https://skillicons.dev)

- **APIs**:
  
  - HG Weather - **HGBRASIL**
  - APOD - **NASA**
  

## <img src="src/assets/icons/logo1x1.png" width=19 > Endpoints das APIs

### 1.  HG Weather

**Descrição:**
O HG Weather é uma API que fornece dados de previsão do tempo e condições climáticas atuais para uma cidade.
API fácil de implementar, com respostas e parâmetros objetivos, com bibliotecas em PHP, Ruby e JavaScript.

**Endpoint:** ``/weather``

**Exemplo de Requisição:**
```http
GET https://api.hgbrasil.com/weather
```

**Exemplo de Resposta:**
```json
{
  "by": "default",
  "valid_key": false,
  "results": {
    "temp": 24,
    "date": "15/02/2025",
    "time": "21:09",
    "condition_code": "28",
    "description": "Tempo nublado",
    "currently": "noite",
    "cid": "",
    "city": "São Paulo, SP",
    "img_id": "28n",
    "humidity": 87,
    "cloudiness": 75,
    "rain": 0,
    "wind_speedy": "3.6 km/h",
    "wind_direction": 150,
    "wind_cardinal": "SE",
    "sunrise": "05:54 am",
    "sunset": "06:46 pm",
    "moon_phase": "waning_gibbous",
    "condition_slug": "cloudly_night",
    "city_name": "São Paulo",
    "timezone": "-03:00",
    "forecast": [
      {
        "date": "15/02",
        "weekday": "Sáb",
        "max": 30,
        "min": 19,
        "humidity": 51,
        "cloudiness": 4,
        "rain": 5.01,
        "rain_probability": 100,
        "wind_speedy": "3.69 km/h",
        "sunrise": "05:54 am",
        "sunset": "06:46 pm",
        "moon_phase": "waning_gibbous",
        "description": "Chuva",
        "condition": "rain"
      }
}
```

### 2. APOD (  Astronomy Picture of the Day )

**Descrição:**
é uma interface de programação de aplicações (API) desenvolvida pela NASA que fornece diariamente uma imagem astronômica.

**Endpoint:** ``/apod``

**Exemplo de Requisição:**
```http
GET https://api.nasa.gov/planetary/apod
```

**Exemplo de Resposta:**
```json
{
  "date": "2025-02-12",
  "explanation": "What can a space rock tell us about life on Earth?  NASA's OSIRIS-REx spacecraft made a careful approach to the near-Earth asteroid 101955 Bennu in October of 2020 to collect surface samples.  In September 2023, the robotic spaceship returned these samples to Earth.  A recent analysis has shown, surprisingly, that the samples contained 14 out of the 20 known amino acids that are the essential building blocks of life.  The presence of the amino acids re-introduces a big question: Could life have originated in space?  However, the protein building blocks themselves held another surprise -- they contained an even mixture of left-handed and right-handed amino acids -- in contrast to our Earth which only has left-handed ones.  This raises another big question: Why does life on Earth have only left-handed amino acids?  Research on this is sure to continue.",
  "media_type": "video",
  "service_version": "v1",
  "title": "Asteroid Bennu Holds the Building Blocks of Life",
  "url": "https://www.youtube.com/embed/ukCSRYcjSQw?rel=0"
}
```

## 📄 Licença

Este projeto não possui uma licença definida. Sinta-se livre para utilizar e modificar o código conforme necessário.

## 📩 Contato

Para dúvidas ou sugestões, entre em contato:

- **Nome**: Glauedson Carlos Rodrigues
- **Email**: (gluedson18s@gmail.com)