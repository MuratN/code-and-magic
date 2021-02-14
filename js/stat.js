window.renderStatistics = function (ctx, names, times) {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(110, 20, 420, 270);
    ctx.fillStyle = 'rgba(256, 256, 256, 1)';
    ctx.strokeRect(100, 10, 420, 270);
    ctx.fillRect(100, 10, 420, 270);
    ctx.font = '16px PT Mono';
    ctx.textBaseline = 'hanging';
    ctx.fillStyle = 'rgba(0, 0, 0, 1)';
    ctx.fillText('Ура вы победили!', 120, 40);
    ctx.fillText('Список результатов:', 120, 60);

    var max = -1;
    var maxIndex = -1;

    for (var i = 0 ; i < times.length; i++) {
        var time = times[i];
        if (time > max) {
        max = time;
        maxIndex = i;
        }
    }

    var histogramHeight = -100;
    var step = histogramHeight / (max - 0);
    var barWidth = 40;
    var indent = 80;
    var initialY = 240;
    var initialX = 140;
    var lineHeight = 15;
    var histogramMargin = 110;
    var timesMargin = 20;
    
    for(var i = 0; i < times.length; i++) {
        console.log(step);
        if (names[i] === 'Вы') {
            ctx.fillStyle = 'rgba(255, 0, 0, 1)';
            ctx.fillRect(initialX + indent * i, initialY, barWidth , times[i] * step);
            ctx.fillStyle = 'rgba(0, 0, 0, 1)';
            ctx.fillText(names[i], initialX + indent * i, initialY + histogramHeight + histogramMargin);
            ctx.fillText(Math.floor(times[i]), initialX + indent * i, Math.floor(times[i] * step) - 2 * histogramHeight + timesMargin);
        } else {
            ctx.fillStyle = 'rgba(0, 0, 255, ' + Math.random() + ')';
            ctx.fillRect(initialX + indent * i, initialY, barWidth , times[i] * step);
            ctx.fillStyle = 'rgba(0, 0, 0, 1)';
            ctx.fillText(names[i], initialX + indent * i, initialY + histogramHeight + histogramMargin);
            ctx.fillText(Math.floor(times[i]), initialX + indent * i, Math.floor(times[i] * step) - 2 * histogramHeight + timesMargin);
        }
    }
}
