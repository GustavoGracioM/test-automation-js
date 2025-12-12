Feature: System Check

  Background:
    Given estou logado com usuário "gmartins+it2@ionic.health" e senha "Gr@c1o2025c"

  Scenario: Executar System Check e verificar resultado
    When acesso a página System Check
    Then o título 'System Check' deve estar visível
    When seleciono o técnico "local"
    And inicio o System Check
    Then o teste é concluído e a tela de resultado é exibida
