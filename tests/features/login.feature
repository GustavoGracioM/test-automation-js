Feature: Login

  Scenario: Login válido
    Given estou na página de login
    When faço login com usuário "gmartins+it2@ionic.health" e senha "Gr@c1o2025c"
    And clico em Next
    Then o dropdrowMenu deve ser visivel
  