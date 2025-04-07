package com.acko.tool.delegates.CRM;

import lombok.AllArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.camunda.bpm.engine.delegate.DelegateExecution;
import org.camunda.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

@Log4j2
@Component
@AllArgsConstructor
public class EmailEscalation implements JavaDelegate {

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {

    }
}
